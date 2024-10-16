import React, { useEffect, useRef, useState } from "react";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import io from "socket.io-client";

const SOCKET_SERVER_URL = "http://192.168.8.129:5001";

export default function App() {
  const notificationListener = useRef();
  const responseListener = useRef();
  const socketRef = useRef(null);

  useEffect(() => {
    // Configure notification handler to show alerts even when app is in foreground
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    // Request permissions and setup push notifications
    registerForPushNotificationsAsync();

    // Setup Socket.io connection
    socketRef.current = io(SOCKET_SERVER_URL, {
      transports: ["websocket"],
      forceNew: true,
    });

    socketRef.current.on("connect", () => {
      console.log("Connected to Socket.io server:", socketRef.current.id);
    });

    socketRef.current.on("notification", async (data) => {
      console.log("Received notification:", data);
      const is_known =
        data.isKnown !== undefined ? data.isKnown : data.user !== "Unknown";
      Notifications.scheduleNotificationAsync({
        content: {
          title: is_known ? "Face Recognized!" : "Unknown Face Detected!",
          body: `User: ${data.user}\nConfidence: ${data.confidence}%`,
          data: { ...data },
        },
        trigger: null, // Send immediately
      });
    });

    socketRef.current.on("disconnect", () => {
      console.log("Disconnected from Socket.io server");
    });

    socketRef.current.on("connect_error", (err) => {
      console.error("Connection error:", err);
    });

    // Listener for incoming notifications while app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("Notification Received:", notification);
      });

    // Listener for user interacting with the notification (e.g., tapping it)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification Response:", response);
      });

    return () => {
      // Clean up listeners and socket on unmount
      if (notificationListener.current)
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      if (responseListener.current)
        Notifications.removeNotificationSubscription(responseListener.current);
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

// Function to register for push notifications and request permissions
async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("Expo Push Token:", token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
