import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../components/Login";
import Home from "../components/Home";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
