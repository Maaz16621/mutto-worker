import { Tabs, useRouter } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();


  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ff7a00',
        tabBarInactiveTintColor: '#999',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarShowLabel: false,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            backgroundColor: '#FFF5EF',
            borderTopWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
          },
          default: {
            backgroundColor: '#FFF5EF',
            borderTopWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
          },
        }),
      }}>
      
      {/* Home */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={24} color={color} />
          ),
        }}
      />

      {/* Edit Profile */}
      <Tabs.Screen
        name="edit-profile"
        options={{
          title: 'Edit Profile',
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={24} color={color} />
          ),
          tabBarButton: (props) => (
            <HapticTab {...props} onPress={() => router.push('/edit-profile')} />
          ),
        }}
      />

      {/* Booking */}
      <Tabs.Screen
        name="booking"
        options={{
          title: 'Bookings',
          tabBarIcon: ({ color }) => (
            <Ionicons name="calendar-outline" size={24} color={color} />
          ),
        }}
      />
      {/* Grid Profile */}
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Profile Grid',
          tabBarIcon: ({ color }) => (
            <Ionicons name="grid-outline" size={24} color={color} />
          ),
        }}
      />


      {/* Hidden Tabs */}
      <Tabs.Screen name="bookmark" options={{ href: null }} />
      <Tabs.Screen name="search" options={{ href: null }} />
      
    </Tabs>
  );
}
