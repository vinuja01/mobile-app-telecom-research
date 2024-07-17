import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../components/Login";
import Home from "../components/Home";
import EmployeeDetails from "../components/EmployeeDetails";
import SiteDetails from "../components/SiteDetails";
import Emergency from "../components/Emergency";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: "TELEMAN", // Customize the title displayed in the header
          headerStyle: {
            backgroundColor: "#6200ee", // Customize the header background color
          },
          headerTintColor: "#fff", // Customize the header text color
          headerTitleStyle: {
            fontWeight: "bold", // Customize the header title style
          },
        }}
      />
      <Stack.Screen name="EmployeeDetails" component={EmployeeDetails} />
      <Stack.Screen name="SiteDetails" component={SiteDetails} />
      <Stack.Screen name="Emergency" component={Emergency} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
