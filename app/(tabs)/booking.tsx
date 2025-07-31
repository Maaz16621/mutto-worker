import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const BookingsScreen = () => {
  const [activeTab, setActiveTab] = useState('Completed');

  const renderContent = () => {
    // Add your content for each tab here
    return (
      <ScrollView style={styles.contentContainer}>
        <BookingCard />
        <BookingCard />
        <BookingCard />
        <BookingCard />
        <BookingCard />
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Bookings</Text>
      <View style={styles.tabContainer}>
        <TabButton title="Processing" activeTab={activeTab} onPress={() => setActiveTab('Processing')} />
        <TabButton title="Requested" activeTab={activeTab} onPress={() => setActiveTab('Requested')} />
        <TabButton title="Completed" activeTab={activeTab} onPress={() => setActiveTab('Completed')} />
        <TabButton title="Cancelled" activeTab={activeTab} onPress={() => setActiveTab('Cancelled')} />
      </View>
      {renderContent()}
    </View>
  );
};

const TabButton = ({ title, activeTab, onPress }) => (
  <TouchableOpacity
    style={[styles.tabButton, activeTab === title && styles.activeTab]}
    onPress={onPress}
  >
    <Text style={[styles.tabButtonText, activeTab === title && styles.activeTabText]}>{title}</Text>
  </TouchableOpacity>
);

const BookingCard = () => (
  <LinearGradient
    colors={['#FF6A00', '#FF7D2E', '#FF9241']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={styles.card}
  >
    <View style={styles.cardHeader}>
      <Text style={[styles.cardTitle, styles.textWhite]}>Car Wash</Text>
      <Text style={styles.cardLink}>View Details</Text>
    </View>
    <View style={styles.cardBody}>
      <View style={{ width: '48%' }}>
        <Text style={[styles.cardValue, styles.textBlack]}>Exterior Eco Wash</Text>
      </View>
      <View style={styles.verticalLine} />
      <View style={{ width: '45%', alignItems: 'flex-end' }}>
        <Text style={[styles.cardLabel, styles.textBlack]}>Date-Time</Text>
        <Text style={[styles.cardValue, styles.textBlack]}>7 July-2025 3:pm</Text>
      </View>
    </View>
  </LinearGradient>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
     paddingHorizontal: 10,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#ff7a00',
  },
  tabButtonText: {
    color: '#333',
  },
  activeTabText: {
    color: '#fff',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  card: {
    borderRadius: 16,
    paddingTop: 17,
    paddingBottom: 14,
    paddingHorizontal: 19,
    marginBottom: 15,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 21,
    backgroundColor: 'transparent',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardLink: {
    color: 'white',
  },
  cardBody: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: 'transparent',
  },
  verticalLine: {
    width: 1,
    height: 33,
    backgroundColor: '#13171C80',
  },
  cardLabel: {
    color: 'black',
    marginBottom: 5,
  },
  cardValue: {
    fontSize: 16,
  },
  textBlack: {
    color: 'black',
  },
  textWhite: {
    color: 'white',
  }
});

export default BookingsScreen;

