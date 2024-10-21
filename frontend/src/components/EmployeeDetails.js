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
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";

const logo = require("../../assets/site360.png");

const EmployeeDetails = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [arrivalDate, setArrivalDate] = useState(new Date());
  const [siteLocation, setSiteLocation] = useState("");
  const [designation, setDesignation] = useState("");
  const [tasksDone, setTasksDone] = useState("");
  const [hoursSpent, setHoursSpent] = useState("");
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
  const designationOptions = [
    "Site Supervisor",
    "Mechanical Engineer",
    "Hardware Engineer",
    "Electrical Engineer",
    "Network Engineer",
    "Cleaner",
  ];

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || arrivalDate;
    setShowDatePicker(false);
    setArrivalDate(currentDate);
  };

  const validateFields = () => {
    if (
      !employeeId.trim() ||
      !employeeName.trim() ||
      !siteLocation.trim() ||
      !designation.trim() ||
      !tasksDone.trim() ||
      !hoursSpent.trim()
    ) {
      Alert.alert("Missing Information", "Please fill all the fields.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateFields()) {
      return; // Stop the submission if validation fails
    }

    const employeeData = {
      employeeId,
      employeeName,
      arrivalDate: arrivalDate.toISOString(),
      siteLocation,
      designation,
      tasksDone: tasksDone.split(", "),
      hoursSpent: parseInt(hoursSpent, 10),
    };

    try {
      const response = await axios.post(
        "http://192.168.8.129:5001/api/employees",
        employeeData
      );
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
      Alert.alert(
        "Error",
        `Failed to submit employee details: ${error.message}`
      );
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Image source={logo} style={styles.image} resizeMode="contain" />

      <View style={styles.inputView}>
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
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.buttonText}>Show Date Picker</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={arrivalDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <View style={{ marginBottom: 20 }}></View>

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

        <Text style={styles.label}>Designation</Text>
        <Picker
          selectedValue={designation}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setDesignation(itemValue)}
        >
          {designationOptions.map((role, index) => (
            <Picker.Item key={index} label={role} value={role} />
          ))}
        </Picker>

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
  },
  contentContainer: {
    alignItems: "center",
    paddingTop: 30,
  },
  inputView: {
    width: "90%",
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  image: {
    height: 150,
    width: 170,
    marginBottom: 30,
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    backgroundColor: "white",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 7,
    marginBottom: 20,
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

export default EmployeeDetails;
