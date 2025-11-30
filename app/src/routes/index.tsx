import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Ionicons,
  Feather,
  Octicons,
} from "@expo/vector-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Home from "../pages/Home";
import Discover from "../pages/Discover";
import Create from "../pages/Create";
import Inbox from "../pages/Inbox";
import Profile from "../pages/Profile";
import FlikDetail from "../pages/FlikDetail";
import NewFollowers from "../pages/Inbox/NewFollowers";
import Activity from "../pages/Inbox/Activity";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const DiscoverStack = createStackNavigator();
const ProfileStack = createStackNavigator();

// Icon wrapper with shadow
const IconWithShadow = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.iconShadow}>{children}</View>
);

const styles = StyleSheet.create({
  iconShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1, // For Android
  },
});

// Discover Stack Navigator (includes Discover and FlikDetail)
const DiscoverStackNavigator = () => {
  return (
    <DiscoverStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "none", // Disable animations
      }}
    >
      <DiscoverStack.Screen name="DiscoverMain" component={Discover} />
      <DiscoverStack.Screen name="FlikDetail" component={FlikDetail} />
    </DiscoverStack.Navigator>
  );
};

// Profile Stack Navigator (includes Profile and FlikDetail)
const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "none", // Disable animations
      }}
    >
      <ProfileStack.Screen name="ProfileMain" component={Profile} />
      <ProfileStack.Screen name="FlikDetail" component={FlikDetail} />
    </ProfileStack.Navigator>
  );
};

const TabNavigator = () => {
  const [activeRoute, setActiveRoute] = useState("Home");
  const [isFlikDetail, setIsFlikDetail] = useState(false);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => {
        const routeName = getFocusedRouteNameFromRoute(route) ?? route.name;
        const isDetailScreen = routeName === "FlikDetail";

        return {
          headerShown: false,
          tabBarStyle: isDetailScreen
            ? { display: "none" } // Completely hide tab bar on FlikDetail
            : {
                position: "absolute",
                backgroundColor:
                  activeRoute === "Home"
                    ? "transparent"
                    : "#fff",
                borderTopWidth: 0,
                elevation: 2, // For Android shadow
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity:
                  activeRoute === "Home"
                    ? 0.2
                    : 0.1,
                shadowRadius: 1.5,
              },
          tabBarActiveTintColor:
            activeRoute === "Home"
              ? "#fff"
              : "#000",
          tabBarInactiveTintColor:
            activeRoute === "Home"
              ? "#888"
              : "#999",
          tabBarShowLabel: false,
          lazy: false, // Load all tabs immediately to avoid animation delays
        };
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        listeners={{
          focus: () => setActiveRoute("Home"),
        }}
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <IconWithShadow>
                <Octicons name="home" size={28} color={color} />
              </IconWithShadow>
            ) : (
              <Octicons name="home" size={28} color={color} />
            ),
        }}
      />
      <Tab.Screen
        name="Discover"
        component={DiscoverStackNavigator}
        listeners={{
          focus: () => setActiveRoute("Discover"),
        }}
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <IconWithShadow>
                <Ionicons name="search" size={28} color={color} />
              </IconWithShadow>
            ) : (
              <Ionicons name="search" size={28} color={color} />
            ),
        }}
      />
      <Tab.Screen
        name="Inbox"
        component={Inbox}
        listeners={{
          focus: () => setActiveRoute("Inbox"),
        }}
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <IconWithShadow>
                <Feather name="inbox" size={28} color={color} />
              </IconWithShadow>
            ) : (
              <Feather name="inbox" size={28} color={color} />
            ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        listeners={{
          focus: () => setActiveRoute("Profile"),
        }}
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <IconWithShadow>
                <Octicons name="person" size={28} color={color} />
              </IconWithShadow>
            ) : (
              <Octicons name="person" size={28} color={color} />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

const Routes = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CreateModal"
            component={Create}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="NewFollowers"
            component={NewFollowers}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Activity"
            component={Activity}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Routes;
