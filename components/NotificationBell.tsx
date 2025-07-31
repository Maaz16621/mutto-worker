import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
const NotificationBell = () => {
  return (
    <Link href="/NotificationScreen" asChild>
      <TouchableOpacity style={styles.bellContainer}>
           <Ionicons name="notifications-outline" size={24} color="#000" style={styles.bellIcon}/>

      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  bellContainer: {
    marginRight: 16,
  },
  bellIcon: {
    width: 24,
    height: 24,
  },
});

export default NotificationBell;
