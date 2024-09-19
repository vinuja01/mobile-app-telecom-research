import React from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const Home = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("EmployeeDetails")}
        >
          <Ionicons name="people" size={24} color="white" />
          <Text style={styles.buttonText}>Employee Details</Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("SiteDetails")}
        >
          <MaterialIcons name="place" size={24} color="white" />
          <Text style={styles.buttonText}>Site Details</Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("WorkingProofs")}
        >
          <MaterialIcons name="place" size={24} color="white" />
          <Text style={styles.buttonText}>WorkingProofs</Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Emergency")}
        >
          <MaterialIcons name="emergency" size={24} color="white" />
          <Text style={styles.buttonText}>Emergency</Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
        >
          <Ionicons name="log-out" size={24} color="white" />
          <Text style={styles.buttonText}>Logout</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#6200ee",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginVertical: 10,
    width: "80%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "600",
  },
});

export default Home;
