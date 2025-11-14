import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Home from '../pages/Home';
import Discover from '../pages/Discover';
import Create from '../pages/Create';
import Inbox from '../pages/Inbox';
import Profile from '../pages/Profile';
import CreateButton from '../components/CreateButton';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => {
  const insets = useSafeAreaInsets();
  
  return (
    <Tab.Navigator
      shifting={false}
      labeled={false}
      barStyle={{
        backgroundColor: '#000',
        height: 50 + insets.bottom,
        paddingBottom: insets.bottom,
      }}
      activeIndicatorStyle={{
        backgroundColor: 'transparent',
      }}
      initialRouteName="Home"
      activeColor="#fff"
      inactiveColor="#888"
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Discover"
        component={Discover}
        options={{
          tabBarLabel: 'Discover',
          tabBarIcon: ({ color }) => (
            <Ionicons name="search" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Create"
        component={Create}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('CreateModal');
          },
        })}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => <CreateButton />,
        }}
      />
      <Tab.Screen
        name="Inbox"
        component={Inbox}
        options={{
          tabBarLabel: 'Inbox',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="message-text-outline"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={24} color={color} />
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
        <Stack.Navigator mode="modal">
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
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Routes;

