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

const EmployeeDetails = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [arrivalDate, setArrivalDate] = useState(new Date());
  const [siteLocation, setSiteLocation] = useState("");
  const [designation, setDesignation] = useState("");
  const [tasksDone, setTasksDone] = useState("");
  const [hoursSpent, setHoursSpent] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || arrivalDate;
    setShowDatePicker(Platform.OS === "ios"); // Hide date picker after selection
    setArrivalDate(currentDate);
  };

  const handleSubmit = async () => {
    const employeeData = {
      employeeId,
      employeeName,
      arrivalDate: arrivalDate.toISOString(), // Ensure date is in ISO format
      siteLocation,
      designation,
      tasksDone: tasksDone.split(", "), // Assuming tasks are entered and separated by a comma
      hoursSpent: parseInt(hoursSpent, 10), // Ensure hoursSpent is a number
    };

    try {
      const response = await axios.post(
        "http://192.168.140.193:5001/api/employees",
        employeeData
      );
      console.log("Response:", response.data); // Log the response data
      if (response.status === 201) {
        Alert.alert("Success", "Employee details added successfully");
        // Clear the form
        setEmployeeId("");
        setEmployeeName("");
        setArrivalDate(new Date());
        setSiteLocation("");
        setDesignation("");
        setTasksDone("");
        setHoursSpent("");
      } else {
        Alert.alert(
          "Error",
          `Unexpected response from server: ${response.status}`
        );
      }
    } catch (error) {
      console.error("Failed to submit employee details", error);
      Alert.alert(
        "Error",
        `Failed to submit employee details: ${error.message}`
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Employee ID</Text>
      <TextInput
        style={styles.input}
        value={employeeId}
        onChangeText={setEmployeeId}
        placeholder="Enter Employee ID"
      />

      <Text style={styles.label}>Employee Name</Text>
      <TextInput
        style={styles.input}
        value={employeeName}
        onChangeText={setEmployeeName}
        placeholder="Enter Employee Name"
      />

      <Text style={styles.label}>Arrival Date</Text>
      <View>
        <Button
          title="Show Date Picker"
          onPress={() => setShowDatePicker(true)}
        />
        {showDatePicker && (
          <DateTimePicker
            value={arrivalDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
      </View>

      <Text style={styles.label}>Site Location</Text>
      <TextInput
        style={styles.input}
        value={siteLocation}
        onChangeText={setSiteLocation}
        placeholder="Enter Site Location"
      />

      <Text style={styles.label}>Designation</Text>
      <TextInput
        style={styles.input}
        value={designation}
        onChangeText={setDesignation}
        placeholder="Enter Designation"
      />

      <Text style={styles.label}>Tasks Done (separated by commas)</Text>
      <TextInput
        style={styles.input}
        value={tasksDone}
        onChangeText={setTasksDone}
        placeholder="Enter Tasks Done"
      />

      <Text style={styles.label}>Hours Spent</Text>
      <TextInput
        style={styles.input}
        value={hoursSpent}
        keyboardType="numeric"
        onChangeText={setHoursSpent}
        placeholder="Enter Hours Spent"
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

export default EmployeeDetails;
