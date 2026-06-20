  import React from "react";
  import { NavigationContainer } from "@react-navigation/native";
  import { createNativeStackNavigator } from "@react-navigation/native-stack";

  import GroupDocumentsScreen from "../screens/GroupDocumentsScreen";
  import NewDocumentScreen from "../screens/NewDocumentScreen";
  import TabNavigator from "./TabNavigator";
  import RegisterScreen from "../screens/RegisterScreen";
  import LoginScreen from "../screens/LoginScreen";
  import DashboardScreen from "../screens/DashboardScreen";

  const Stack = createNativeStackNavigator();

  export default function AppNavigator() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Group>
          <Stack.Screen name="Dashboard" component={TabNavigator} />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: "modal" }}>
          <Stack.Screen name="NewDocument" component={NewDocumentScreen}/>
            </Stack.Group>
            <Stack.Screen name="GroupDocuments" component={GroupDocumentsScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }