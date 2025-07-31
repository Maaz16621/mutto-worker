
import Notification from '@/components/Notification';
import { notifications } from '@/constants/Notification';
import { Link } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const NotificationScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Link href="/(tabs)" asChild>
          <TouchableOpacity style={styles.backButton}>
          <Svg width="14" height="18" viewBox="0 0 9 14" fill="none" >
<Path d="M7.28443 12.4241L1.70215 6.8418L7.28443 1.25952" stroke="#13171C" stroke-width="1.86076" stroke-linecap="round" stroke-linejoin="round"/>
</Svg>

          </TouchableOpacity>
        </Link>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity>
          <Text style={styles.clearAll}>Clear All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={notifications}
        renderItem={({ item }) => <Notification notification={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 126, 46, 0.1)',
    paddingBottom: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  clearAll: {
    fontSize: 16,
    color: '#FF7D2E',
  },
  listContainer: {
    padding: 22,
  },
});

export default NotificationScreen;
