import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth } from '../../firebase';

const defaultUserImage = require('../../assets/images/default-user.png');

export default function ProfileEditScreen() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/welcome');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace('/(tabs)')}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.profileImageContainer}>
          <Image source={defaultUserImage} style={styles.profileImage} />
          <TouchableOpacity style={styles.editIcon}>
            <Ionicons name="pencil" size={16} color="white" />
          </TouchableOpacity>
        </View>
        <Text style={styles.userName}>Max Cruz</Text>
      </View>

      {/* Options List */}
      <View style={styles.optionsList}>
        <TouchableOpacity style={styles.optionItem}>
          <Ionicons name="call-outline" size={20} color="black" />
          <Text style={styles.optionText}>Phone No</Text>
          <Ionicons name="chevron-forward"  size={20} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionItem} onPress={() => router.push('/my-vehicles')}>
          <Ionicons name="car-outline" size={20} color="black" />
          <Text style={styles.optionText}>My Vehicles</Text>
          <Ionicons name="chevron-forward" size={20} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionItem} onPress={() => router.push('/MyAddressesScreen')}>
          <Ionicons name="location-outline" size={20} color="black" />
          <Text style={styles.optionText}>My Locations</Text>
          <Ionicons name="chevron-forward" size={20} color="black" />
        </TouchableOpacity>

      <TouchableOpacity style={styles.optionItem} onPress={() => router.push('/change-password')}>
          <Ionicons name="lock-closed-outline" size={20} color="black" />
          <Text style={styles.optionText}>Change Password</Text>
          <Ionicons name="chevron-forward" size={20} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.optionItem, styles.logoutOption]} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="red" />
          <Text style={[styles.optionText, styles.logoutText]}>Logout</Text>
          <Ionicons name="chevron-forward" size={20} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 50, // Adjust for status bar
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#eee',
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FF8C00', // Orange color from image
    borderRadius: 15,
    padding: 5,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
  },
  optionsList: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 10,
    gap: 2,
    overflow: 'hidden',
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8F0', // Light orange background from image
    paddingVertical: 20,
    paddingHorizontal: 24,
    
  },
  optionText: {
    flex: 1,
    marginLeft: 15,
    
    fontWeight: '700',
    fontSize: 16,
  },
  logoutOption: {
    borderBottomWidth: 0, // No border for the last item
  },
  logoutText: {
    color: 'red',
  },
});
