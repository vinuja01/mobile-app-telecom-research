// src/config/PushNotificationConfig.js
import PushNotification from "react-native-push-notification";
import { Platform } from "react-native";

// Configure PushNotification
PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log("TOKEN:", token);
    // You can send the token to your backend if needed
  },

  // (required) Called when a remote or local notification is opened or received
  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);

    // Process the notification here

    // (required) Called when a remote is received or opened, or local notification is opened
    notification.finish(PushNotification.FetchResult.NoData);
  },

  // IOS ONLY (optional): default: all - Permissions to register
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specifies if permissions (iOS) and token (Android and iOS) will be requested or not,
   * - if not, you must call PushNotification.requestPermissions() later
   */
  requestPermissions: Platform.OS === "ios",
});

// Create a channel for Android (required for Android 8.0+)
PushNotification.createChannel(
  {
    channelId: "entrance-alerts", // (required)
    channelName: "Entrance Alerts", // (required)
    channelDescription: "A channel for entrance alerts notifications", // (optional) default: undefined.
    playSound: true, // (optional) default: true
    soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
    importance: 4, // (optional) default: 4. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
  },
  (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
);

export default PushNotification;
