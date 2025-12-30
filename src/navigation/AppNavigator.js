import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LeadListScreen from "../screens/LeadListScreen";
import LeadDetailScreen from "../screens/LeadDetailScreen";
import AddEditLeadScreen from "../screens/AddEditLeadScreen";
import { COLORS } from "../constants/theme";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.surface,
          },
          headerTintColor: COLORS.text,
          headerTitleStyle: {
            fontWeight: "600",
          },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="LeadList"
          component={LeadListScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LeadDetail"
          component={LeadDetailScreen}
          options={{ title: "Lead Details" }}
        />
        <Stack.Screen
          name="AddEditLead"
          component={AddEditLeadScreen}
          options={({ route }) => ({
            title: route.params?.leadId ? "Edit Lead" : "Add New Lead",
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
