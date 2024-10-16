import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../components/Login";
import Home from "../components/Home";
import EmployeeDetails from "../components/EmployeeDetails";
import SiteDetails from "../components/SiteDetails";
import Emergency from "../components/EntranceAlerts";
import WorkingProofs from "../components/WorkingProofs";
import EntranceAlerts from "../components/EntranceAlerts";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: "Login Form",
          headerStyle: {
            backgroundColor: "brown",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: "Home Page",
          headerStyle: {
            backgroundColor: "brown",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="EmployeeDetails"
        component={EmployeeDetails}
        options={{
          title: "Employee Details",
          headerStyle: {
            backgroundColor: "brown",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="SiteDetails"
        component={SiteDetails}
        options={{
          title: "Site Details",
          headerStyle: {
            backgroundColor: "brown",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="EntranceAlerts"
        component={EntranceAlerts}
        options={{
          title: "Site 360",
          headerStyle: {
            backgroundColor: "brown",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="WorkingProofs"
        component={WorkingProofs}
        options={{
          title: "TELEMAN",
          headerStyle: {
            backgroundColor: "#6200ee",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
