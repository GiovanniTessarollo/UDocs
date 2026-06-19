import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import NewDocumentScreen from "../screens/NewDocumentScreen";
import DashboardScreen from "../screens/DashboardScreen";
import DocumentsScreen from "../screens/DocumentsScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={DashboardScreen}
      />

      <Tab.Screen
        name="Documentos"
        component={DocumentsScreen}
      />

      <Tab.Screen
        name="Perfil"
        component={ProfileScreen}
      />

    </Tab.Navigator>
  );
}