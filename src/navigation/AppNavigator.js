  import React from "react";
  import { useEffect } from "react";
  import { requestNotificationPermission } from "../services/NotificationService";
  import { NavigationContainer } from "@react-navigation/native";
  import { createNativeStackNavigator } from "@react-navigation/native-stack";

  import UpcomingDocumentsScreen from "../screens/UpcomingDocumentsScreen";
  import EditDocumentScreen from "../screens/EditDocumentScreen";
  import DocumentDetailsScreen from "../screens/DocumentDetailsScreen";
  import FavoriteDocumentsScreen from "../screens/FavoriteDocumentsScreen";
  import ExpiredDocumentsScreen from "../screens/ExpiredDocumentsScreen";
  import GroupDocumentsScreen from "../screens/GroupDocumentsScreen";
  import NewDocumentScreen from "../screens/NewDocumentScreen";
  import TabNavigator from "./TabNavigator";
  import RegisterScreen from "../screens/RegisterScreen";
  import LoginScreen from "../screens/LoginScreen";
  import DashboardScreen from "../screens/DashboardScreen";

  const Stack = createNativeStackNavigator();

 export default function AppNavigator() {

  //useEffect(() => {
   // requestNotificationPermission();
  //}, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />

        <Stack.Screen
          name="Register"
          component={RegisterScreen}
        />

        <Stack.Group>
          <Stack.Screen
            name="Dashboard"
            component={TabNavigator}
          />
        </Stack.Group>

        <Stack.Group
          screenOptions={{
            presentation: "modal",
          }}
        >
          <Stack.Screen
            name="NewDocument"
            component={NewDocumentScreen}
          />
        </Stack.Group>

        <Stack.Screen
          name="GroupDocuments"
          component={GroupDocumentsScreen}
        />

        <Stack.Screen
          name="ExpiredDocuments"
          component={ExpiredDocumentsScreen}
        />

        <Stack.Screen
          name="FavoriteDocuments"
          component={FavoriteDocumentsScreen}
        />

        <Stack.Screen
          name="DocumentDetails"
          component={DocumentDetailsScreen}
        />

        <Stack.Screen
          name="EditDocument"
          component={EditDocumentScreen}
        />

        <Stack.Screen
          name="UpcomingDocuments"
          component={UpcomingDocumentsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}