// EntranceAlerts.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import io from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SOCKET_SERVER_URL = "http://192.168.8.129:5001";
const STORAGE_KEY = "@entrance_alerts_notifications";

const EntranceAlerts = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Utility functions
  const loadNotificationsFromStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      const loadedNotifications =
        jsonValue != null ? JSON.parse(jsonValue) : [];
      console.log("Notifications loaded from storage:", loadedNotifications);
      return loadedNotifications;
    } catch (e) {
      console.error("Failed to load notifications from storage", e);
      return [];
    }
  };

  const saveNotificationsToStorage = async (notifications) => {
    try {
      const jsonValue = JSON.stringify(notifications);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
      console.log("Notifications saved to storage:", notifications);
    } catch (e) {
      console.error("Failed to save notifications to storage", e);
    }
  };

  const purgeOldNotifications = (notifications) => {
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const purged = notifications.filter((notification) => {
      const notificationTime = new Date(notification.timestamp).getTime();
      console.log(
        `Notification Time: ${notificationTime}, Seven Days Ago: ${sevenDaysAgo}`
      );
      return notificationTime >= sevenDaysAgo;
    });
    console.log("Purged Notifications:", purged);
    return purged;
  };

  useEffect(() => {
    let socket;
    let cleanupInterval;

    const setupSocket = async () => {
      // Load notifications from storage
      const storedNotifications = await loadNotificationsFromStorage();
      const purgedNotifications = purgeOldNotifications(storedNotifications);
      setNotifications(purgedNotifications);
      await saveNotificationsToStorage(purgedNotifications);

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
        const newNotification = {
          key: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // Unique key
          user: data.user,
          confidence: data.confidence,
          timestamp: new Date().toISOString(),
        };
        setNotifications((prevNotifications) => {
          const updatedNotifications = purgeOldNotifications([
            newNotification,
            ...prevNotifications,
          ]);
          // Save to storage
          saveNotificationsToStorage(updatedNotifications);
          return updatedNotifications;
        });
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from Socket.io server");
      });

      socket.on("connect_error", (err) => {
        console.error("Connection error:", err);
      });

      // Setup periodic cleanup every hour
      cleanupInterval = setInterval(async () => {
        const currentNotifications = await loadNotificationsFromStorage();
        const purgedNotifications = purgeOldNotifications(currentNotifications);
        if (purgedNotifications.length !== currentNotifications.length) {
          setNotifications(purgedNotifications);
          await saveNotificationsToStorage(purgedNotifications);
          console.log("Purged old notifications");
        }
      }, 60 * 60 * 1000); // Every hour

      setLoading(false); // Loading complete after setting up
    };

    setupSocket();

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
  }, []); // Empty dependency array to run once

  const onRefresh = async () => {
    // Since we're not fetching historical data from the backend, refreshing can simply reload from storage
    setRefreshing(true);
    const storedNotifications = await loadNotificationsFromStorage();
    const purgedNotifications = purgeOldNotifications(storedNotifications);
    setNotifications(purgedNotifications);
    await saveNotificationsToStorage(purgedNotifications);
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Entrance Alerts</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={notifications}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Face Recognized!</Text>
              <Text style={styles.cardBody}>User: {item.user}</Text>
              <Text style={styles.cardBody}>
                Confidence: {item.confidence}%
              </Text>
              <Text style={styles.cardTimestamp}>
                {new Date(item.timestamp).toLocaleString()}
              </Text>
            </View>
          )}
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
    backgroundColor: "#f2f2f2",
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
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
  },
  cardBody: {
    fontSize: 16,
  },
  cardTimestamp: {
    fontSize: 12,
    color: "#555",
    marginTop: 5,
  },
  noData: {
    textAlign: "center",
    color: "#888",
    marginTop: 50,
    fontSize: 16,
  },
});
