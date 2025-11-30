import React from "react";
import { StatusBar } from "expo-status-bar";
import Routes from "./src/routes";
import { FullscreenProvider } from "./src/contexts/FullscreenContext";

export default function App() {
  return (
    <FullscreenProvider>
      <Routes />
      <StatusBar style="light" />
    </FullscreenProvider>
  );
}
