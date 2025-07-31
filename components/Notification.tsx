import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface NotificationProps {
  notification: {
    icon: string;
    title: string;
    description: string;
    time: string;
  };
}

const Notification: React.FC<NotificationProps> = ({ notification }) => {
  return (
    <View style={styles.container}>
            <View style={styles.iconContainer}>
        <Ionicons name={`${notification.icon}-outline`} size={24} style={styles.icon} color="#FF7D2E" />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{notification.title}</Text>
        <Text style={styles.description}>{notification.description}</Text>
        <Text style={styles.time}>{notification.time}</Text>
      </View>
      <TouchableOpacity>
        <Text style={styles.viewDetails}>View Details</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    gap: 16,
    shadowOpacity: 0.1,
    shadowRadius: 1.0,
    elevation: 2,
  },
  iconContainer: {
    backgroundColor: 'rgba(255, 125, 46, 0.1)',
    borderRadius: 50,
    width: 44,
    padding: 10,
    aspectRatio: 1,
  },
  icon: {
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
  viewDetails: {
    fontSize: 14,
    color: '#FF7D2E',
    fontWeight: 'bold',
  },
});

export default Notification;
