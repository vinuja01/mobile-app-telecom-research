import React, { useState, useEffect } from "react";
import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { Feather } from "@expo/vector-icons";

const logo = require("../../assets/site360.png");

export default function Login({ navigation, route }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      // Check if reset parameter is true
      if (route.params?.reset) {
        setUsername("");
        setPassword("");
        setError("");
        // Optionally reset the parameter to avoid unwanted resets
        navigation.setParams({ reset: false });
      }
    }, [route.params])
  );

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Please fill all the fields.");
      return;
    }

    try {
      const response = await axios.post("http://192.168.8.129:5001/api/login", {
        username,
        password,
      });
      if (response.data.message === "Login successful") {
        navigation.navigate("Home");
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      setError("Login failed.");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={logo} style={styles.image} resizeMode="contain" />

      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="USERNAME"
          value={username}
          onChangeText={setUsername}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="PASSWORD"
            secureTextEntry={!passwordVisibility}
            value={password}
            onChangeText={setPassword}
            autoCorrect={false}
            autoCapitalize="none"
          />
          <Pressable
            onPress={togglePasswordVisibility}
            style={styles.visibilityIcon}
          >
            <Feather
              name={passwordVisibility ? "eye-off" : "eye"}
              size={24}
              color="gray"
            />
          </Pressable>
        </View>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>
      <View style={styles.buttonView}>
        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 70,
    backgroundColor: "#F0EBE3",
    height: "100%",
  },
  image: {
    height: 150,
    width: 170,
    marginBottom: 30,
  },
  inputView: {
    gap: 20,
    width: "100%",
    paddingHorizontal: 50,
    marginBottom: 5,
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    backgroundColor: "white",
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 7,
  },
  rememberView: {
    width: "100%",
    paddingHorizontal: 50,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "brown",
    height: 45,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonView: {
    width: "100%",
    paddingHorizontal: 50,
    marginTop: 30,
  },
  optionsText: {
    textAlign: "center",
    paddingVertical: 10,
    color: "gray",
    fontSize: 13,
    marginBottom: 6,
  },
  footerText: {
    textAlign: "center",
    color: "gray",
  },
  signup: {
    color: "red",
    fontSize: 13,
  },
  visibilityIcon: {
    marginLeft: 110, // Space between the input and the icon
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 5,
    paddingRight: 10,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 10,
    textAlign: "center",
  },
});
