import React from "react";
import { LeadProvider } from "./src/context/LeadContext";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  return (
    <LeadProvider>
      <AppNavigator />
    </LeadProvider>
  );
}
