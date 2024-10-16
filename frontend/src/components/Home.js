import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const logo = require("../../assets/site360.png"); // Ensure the path to your logo is correct

const Home = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.mainCard}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.mainCardText}>Welcome to the Site 360</Text>
      </View>

      <View style={styles.lowerCard}>
        <View style={styles.cardContainer}>
          <Pressable
            style={[styles.card, { backgroundColor: "#ffab91" }]}
            onPress={() => navigation.navigate("EmployeeDetails")}
          >
            <Ionicons
              name="people"
              size={28}
              color="white"
              style={styles.icon}
            />
            <Text style={styles.cardText}>Employee Details</Text>
          </Pressable>

          <Pressable
            style={[styles.card, { backgroundColor: "#D04848" }]}
            onPress={() => navigation.navigate("SiteDetails")}
          >
            <MaterialIcons
              name="place"
              size={28}
              color="white"
              style={styles.icon}
            />
            <Text style={styles.cardText}>Site Details</Text>
          </Pressable>

          <Pressable
            style={[styles.card, { backgroundColor: "#ff8a65" }]}
            onPress={() => navigation.navigate("EntranceAlerts")}
          >
            <MaterialIcons
              name="emergency"
              size={28}
              color="white"
              style={styles.icon}
            />
            <Text style={styles.cardText}>Entrance Alerts</Text>
          </Pressable>

          <Pressable
            style={[styles.card, { backgroundColor: "brown" }]}
            onPress={() => {
              navigation.navigate("Login", { reset: true }); // Passing parameter on navigation
            }}
          >
            <Ionicons
              name="log-out"
              size={28}
              color="white"
              style={styles.icon}
            />
            <Text style={styles.cardText}>Logout</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#F0EBE3",
    justifyContent: "space-between",
  },
  mainCard: {
    backgroundColor: "#F8EDED",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 5,
    shadowRadius: 3.84,
    elevation: 10,
    width: "100%",
    marginBottom: 20,
    alignItems: "center",
  },
  mainCardText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "brown",
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
  lowerCard: {
    flex: 1,
    backgroundColor: "#F8EDED",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "100%",
    alignItems: "center", // Centers card container inside lower card
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    width: "100%", // Ensures the container uses full width of the lower card
  },
  card: {
    width: "45%",
    height: "50%",
    marginVertical: 10,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  cardText: {
    color: "white",
    fontWeight: "600",
    fontSize: 18,
    marginTop: 10,
  },
  icon: {
    marginBottom: 10,
  },
});

export default Home;
