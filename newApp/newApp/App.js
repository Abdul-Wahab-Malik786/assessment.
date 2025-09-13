import { StatusBar } from "expo-status-bar";
import React from "react";
import Navigation from "./src/navigation/navigation";
import HomeScreen from "./src/screens/HomeScreen";
import "./src/config/firebase"; // Firebase configuration import

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <HomeScreen />
    </>
  );
}
