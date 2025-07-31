
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  FlatList,
  Image,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import BubbleSVG from '../components/BubbleSVG';

const serviceImage = require('../assets/images/service-image.png');
type Item = {
  id: string;
  name: string;
  price: number;
};

const DATA: Item[] = [
  { id: '1', name: 'Battery Health', price: 300 },
  { id: '2', name: 'On-Demand EV Charging', price: 300 },
  { id: '3', name: 'Engine Check-Up', price: 300 },
  { id: '4', name: 'Steam Wash Exterior', price: 300 },
  { id: '5', name: 'Engine check-up', price: 300 },
];

const BookmarkedScreen = () => {
  const renderItem: ListRenderItem<Item> = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <LinearGradient
        colors={['#FF9241', '#FF7D2E', '#FF6A00']}
        start={{ x: 0.5, y: 0.7291 }}
        end={{ x: 0.2035, y: 0.4663 }}
        style={styles.gradientBackground}
      >
        <BubbleSVG style={styles.bubbleBackground} />
        <View style={styles.circle1} />
        <View style={styles.circle2} />
        <View style={styles.itemTextContainer}>
          <Text style={styles.itemTitle}>{item.name}</Text>
          <TouchableOpacity style={styles.bookNowButton}>
            <Text style={styles.bookNowButtonText}>Book Now</Text>
          </TouchableOpacity>
          <Text style={styles.itemPrice}>AED {item.price}</Text>
        </View>
        <Image source={serviceImage} style={styles.itemImage} />
        <TouchableOpacity style={styles.bookmarkIcon}>
          <Ionicons name="heart" size={24} color="red" />
        </TouchableOpacity>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bookmarked Services</Text>
      <FlatList
        data={DATA}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEF3F0',
    paddingTop: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    
    paddingHorizontal: 20,
  },
  listContent: {
    paddingBottom: 20,
    
    paddingHorizontal: 20,
  },
  itemContainer: {
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
    height: 120,
  },
  gradientBackground: {
    flexDirection: 'row',
    flex: 1,
    borderRadius: 10,
    paddingLeft: 20,
    alignItems: 'center',
    position: 'relative',
    height: '100%',
  },
  itemImage: {
    width: '40%',
    height: '100%',
    borderRadius: 10,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#fff',
  },
  bookNowButton: {
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginTop: 5,
    alignSelf: 'flex-start',
  },
  bookNowButtonText: {
    color: '#FF7D2E',
    fontWeight: 'bold',
    fontSize: 14,
  },
  itemPrice: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
    marginLeft: 25,
  },
  bookmarkIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 15,
    padding: 2,
  },
  circle1: {
    height: "130%",
    aspectRatio: 1,
    borderRadius: '100%',
    backgroundColor: '#CB682C',
    position: 'absolute',
    left: -50,
  },
  circle2: {
   height: "130%",
    aspectRatio: 1,
    borderRadius: '100%',
    backgroundColor: 'rgba(203, 105, 44, 0.34)',
    position: 'absolute',
    left: -10,
  },
  bubbleBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default BookmarkedScreen;
