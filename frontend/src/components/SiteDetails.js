import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  Alert,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";

const logo = require("../../assets/site360.png");

const SiteDetails = () => {
  const [siteId, setSiteId] = useState("");
  const [siteLocation, setSiteLocation] = useState("");
  const [date, setDate] = useState(new Date());
  const [currentFaults, setCurrentFaults] = useState("");
  const [maintenanceRecords, setMaintenanceRecords] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const siteOptions = [
    "Dompe",
    "Biyagama",
    "Kaduwela",
    "Malwana",
    "Hanwella",
    "Padukka",
    "Horana",
    "Homagama",
    "Ragama",
    "Delgoda",
    "Kelaniya",
    "Kiribathgoda",
  ];

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios"); // Only keep showing date picker on iOS
    setDate(currentDate);
  };

  const handleSubmit = async () => {
    const siteData = {
      siteId,
      siteLocation,
      Date: date.toISOString(), // Ensure date is in ISO format
      currentFaults: currentFaults.split(",").map((fault) => fault.trim()), // Convert comma-separated string to array
      MaintainanceRecords: maintenanceRecords
        .split(",")
        .map((record) => record.trim()), // Convert comma-separated string to array
    };

    try {
      const response = await axios.post(
        "http://192.168.8.129:5001/api/sites",
        siteData
      );
      if (response.status === 201) {
        Alert.alert("Success", "Site details added successfully");
        setSiteId("");
        setSiteLocation("");
        setDate(new Date());
        setCurrentFaults("");
        setMaintenanceRecords("");
      } else {
        Alert.alert(
          "Error",
          `Unexpected response from server: ${response.status}`
        );
      }
    } catch (error) {
      Alert.alert("Error", `Failed to submit site details: ${error.message}`);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={logo} style={styles.image} resizeMode="contain" />

      <View style={styles.inputView}>
        <Text style={styles.label}>Site ID</Text>
        <TextInput
          style={styles.input}
          value={siteId}
          onChangeText={setSiteId}
          placeholder="Enter ID number of the site"
        />

        <Text style={styles.label}>Site Location</Text>
        <Picker
          selectedValue={siteLocation}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setSiteLocation(itemValue)}
        >
          {siteOptions.map((site, index) => (
            <Picker.Item key={index} label={site} value={site} />
          ))}
        </Picker>

        <Text style={styles.label}>Date</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.buttonText}>Show Date Picker</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <Text style={styles.label}>Current Faults In Site</Text>
        <TextInput
          style={styles.input}
          value={currentFaults}
          onChangeText={setCurrentFaults}
          placeholder="Enter Current Faults (comma-separated)"
        />

        <Text style={styles.label}>Maintenance Records</Text>
        <TextInput
          style={styles.input}
          value={maintenanceRecords}
          onChangeText={setMaintenanceRecords}
          placeholder="Enter Maintenance Records (comma-separated)"
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0EBE3",
    padding: 20,
  },
  inputView: {
    width: "100%",
  },
  image: {
    height: 150,
    width: 170,
    marginBottom: 30,
    alignSelf: "center", // Center the logo image
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 7,
    marginBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
    color: "brown",
  },
  button: {
    backgroundColor: "brown",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  picker: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 5,
  },
});

export default SiteDetails;
