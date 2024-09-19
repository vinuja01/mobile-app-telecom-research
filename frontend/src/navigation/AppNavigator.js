import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../components/Login";
import Home from "../components/Home";
import EmployeeDetails from "../components/EmployeeDetails";
import SiteDetails from "../components/SiteDetails";
import Emergency from "../components/Emergency";
import WorkingProofs from "../components/WorkingProofs";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="Home"
        component={Home}
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
      <Stack.Screen name="EmployeeDetails" component={EmployeeDetails} />
      <Stack.Screen name="SiteDetails" component={SiteDetails} />
      <Stack.Screen name="Emergency" component={Emergency} />
      <Stack.Screen name="WorkingProofs" component={WorkingProofs} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
