
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import {
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const defaultUserImage = require('../../assets/images/default-user.png');

const ProfileMenuScreen = () => {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleLogout = async () => {
    console.log('Attempting to log out...');
    try {
      await signOut(auth);
      console.log('Firebase signOut successful.');
      router.replace('/welcome');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={defaultUserImage} style={styles.profileImage} />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>Malik</Text>
          <Text style={styles.profileLink}>View profile</Text>
        </View>
        <Ionicons name="settings-outline" size={24} color="black" />
      </View>

      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card}>
          <Ionicons name="reader-outline" size={24} color="black" />
          <Text style={styles.cardText}>Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => router.push('/bookmark')}>
          <Ionicons name="heart-outline" size={24} color="black" />
          <Text style={styles.cardText}>Bookmarks</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>General</Text>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="call-outline" size={24} color="#ff7a00" />
          <Text style={[styles.menuItemText, { color: '#ff7a00' }]}>Contact Mutto support team</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="gift-outline" size={24} color="black" />
          <Text style={styles.menuItemText}>Invite friends</Text>
          <Ionicons name="chevron-forward" size={24} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="star-outline" size={24} color="black" />
          <Text style={styles.menuItemText}>Rate our app</Text>
          <Ionicons name="chevron-forward" size={24} color="#ccc" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Settings</Text>
        <View style={styles.menuItem}>
          <Ionicons name="notifications-outline" size={24} color="black" />
          <Text style={styles.menuItemText}>Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#E9E9EA', true: '#ff7a00' }}
              
            thumbColor={'#fff'}
            ios_backgroundColor="#E9E9EA"
            style={styles.switch}
          />
        </View>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="document-text-outline" size={24} color="black" />
          <Text style={styles.menuItemText}>Terms & policies</Text>
          <Ionicons name="chevron-forward" size={24} color="#ccc" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={24} color="#ff7a00" />
        <Text style={styles.logoutButtonText}>LOG OUT</Text>
      </TouchableOpacity>

      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>© 2025 MUTTO. All rights reserved.</Text>
        <Text style={styles.footerText}>Made by Flow Cubo</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: 30,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileLink: {
    color: '#999',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 10,
  },
  card: {
    backgroundColor: '#FFF5EF',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
    height: 100,
  },
  cardText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuItemText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
  },
  switch: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }]
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ff7a00',
    marginBottom: 20,
  },
  logoutButtonText: {
    color: '#ff7a00',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  footerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  footerText: {
    color: '#999',
    fontSize: 12,
  },
});

export default ProfileMenuScreen;
