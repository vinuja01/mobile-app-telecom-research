import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";

const SiteDetails = () => {
  const [siteId, setSiteId] = useState("");
  const [siteLocation, setSiteLocation] = useState("");
  const [date, setDate] = useState(new Date());
  const [currentFaults, setCurrentFaults] = useState("");
  const [maintenanceRecords, setMaintenanceRecords] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios"); // Hide date picker after selection
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
        "http://192.168.140.193:5001/api/sites",
        siteData
      );
      console.log("Response:", response.data); // Log the response data
      if (response.status === 201) {
        Alert.alert("Success", "Site details added successfully");
        // Clear the form
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
      console.error("Failed to submit site details", error);
      Alert.alert("Error", `Failed to submit site details: ${error.message}`);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Site ID</Text>
      <TextInput
        style={styles.input}
        value={siteId}
        onChangeText={setSiteId}
        placeholder="Enter ID number of the site"
      />

      <Text style={styles.label}>Site Location</Text>
      <TextInput
        style={styles.input}
        value={siteLocation}
        onChangeText={setSiteLocation}
        placeholder="Enter Location of the Site"
      />

      <Text style={styles.label}>Date</Text>
      <View>
        <Button
          title="Show Date Picker"
          onPress={() => setShowDatePicker(true)}
        />
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
      </View>

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

      <Button title="Submit" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default SiteDetails;
