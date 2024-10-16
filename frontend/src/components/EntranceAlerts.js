import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  Platform,
} from "react-native";
import io from "socket.io-client";
import axios from "axios";
import * as Notifications from "expo-notifications";

const SOCKET_SERVER_URL = "http://192.168.8.129:5001"; // Ensure this is correct and accessible
const API_BASE_URL = "http://192.168.8.129:5001/api/face-recognition"; // Adjust as needed

const EntranceAlerts = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Function to fetch alerts from the backend
  const fetchAlerts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/alerts`);
      setNotifications(response.data);
      console.log("Fetched alerts from backend:", response.data);
    } catch (error) {
      console.error("Error fetching alerts:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    let socket;
    let cleanupInterval;

    const setup = async () => {
      // Request notification permissions
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Permission for notifications not granted!");
        return;
      }

      // Set up notification channel for Android
      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("entrance-alerts", {
          name: "Entrance Alerts",
          importance: Notifications.AndroidImportance.HIGH,
          sound: "default",
        });
      }

      // Fetch existing alerts
      await fetchAlerts();

      // Initialize Socket.io connection
      socket = io(SOCKET_SERVER_URL, {
        transports: ["websocket"],
        forceNew: true,
      });

      socket.on("connect", () => {
        console.log("Connected to Socket.io server:", socket.id);
      });

      socket.on("notification", async (data) => {
        console.log("Received notification:", data);
        const is_known =
          data.isKnown !== undefined ? data.isKnown : data.user !== "Unknown";
        const newNotification = {
          _id:
            data._id ||
            `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // Unique key
          user: data.user,
          confidence: data.confidence,
          timestamp: data.timestamp
            ? new Date(data.timestamp).toISOString()
            : new Date().toISOString(),
          isKnown: is_known,
        };
        console.log("New Notification Object:", newNotification);
        setNotifications((prevNotifications) => {
          const updatedNotifications = [
            newNotification,
            ...prevNotifications,
          ].slice(0, 100); // Keep latest 100

          // Trigger a local notification
          Notifications.scheduleNotificationAsync({
            content: {
              title: is_known ? "Face Recognized!" : "Unknown Face Detected!",
              body: `User: ${data.user}\nConfidence: ${data.confidence}%`,
              data: { ...newNotification },
              android: {
                channelId: "entrance-alerts",
              },
            },
            trigger: null, // Send immediately
          })
            .then(() => {
              console.log("Notification scheduled successfully");
            })
            .catch((error) => {
              console.error("Error scheduling notification:", error);
            });

          return updatedNotifications;
        });
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from Socket.io server");
      });

      socket.on("connect_error", (err) => {
        console.error("Connection error:", err);
      });

      // Setup periodic cleanup every hour (optional)
      cleanupInterval = setInterval(() => {
        setNotifications((currentNotifications) => {
          const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
          const purged = currentNotifications.filter((notification) => {
            const notificationTime = new Date(notification.timestamp).getTime();
            return notificationTime >= sevenDaysAgo;
          });
          if (purged.length !== currentNotifications.length) {
            console.log("Purged old notifications");
            return purged;
          }
          return currentNotifications;
        });
      }, 60 * 60 * 1000); // Every hour
    };

    setup();

    // Cleanup on unmount
    return () => {
      if (socket) {
        console.log("Cleaning up socket connection");
        socket.disconnect();
      }
      if (cleanupInterval) {
        clearInterval(cleanupInterval);
      }
    };
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchAlerts();
  };

  const renderItem = ({ item }) => {
    console.log("Rendering item:", item);
    return (
      <View style={styles.card}>
        <Text
          style={[
            styles.cardTitle,
            { color: item.isKnown ? "#4CAF50" : "#4CAF50" },
          ]}
        >
          {item.isKnown ? "Face Recognized!" : " Face Detected!"}
        </Text>
        <Text style={styles.cardBody}>User: {item.user}</Text>
        <Text style={styles.cardBody}>Confidence: {item.confidence}%</Text>
        <Text style={styles.cardBody}>Location: Hanwella</Text>
        <Text style={styles.cardTimestamp}>
          {new Date(item.timestamp).toLocaleString()}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Site Entrance Alerts</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={(item) => item._id.toString()}
          ListEmptyComponent={<Text style={styles.noData}>No alerts yet.</Text>}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
};

export default EntranceAlerts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F0EBE3",
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "brown",
  },
  card: {
    backgroundColor: "#F8EDED",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  cardBody: {
    fontSize: 16,
    color: "#555",
  },
  cardTimestamp: {
    fontSize: 12,
    color: "#888",
    marginTop: 5,
  },
  noData: {
    textAlign: "center",
    color: "#888",
    marginTop: 50,
    fontSize: 16,
  },
});
