import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const serviceDetailImage = require('../assets/images/service-image.png');

const AddonScreen = () => {
  const router = useRouter();
  const [checked, setChecked] = useState<number[]>([]);

  const toggleCheckbox = (index: number) => {
    if (checked.includes(index)) {
      setChecked(checked.filter((item) => item !== index));
    } else {
      setChecked([...checked, index]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Details And Time</Text>
        <View style={styles.stepIndicatorContainer}>
          <View style={styles.stepIndicatorActive} />
          <View style={styles.stepIndicatorActive} />
          <View style={styles.stepIndicatorInactive} />
        </View>
      </View>

      <ScrollView>
        <View style={styles.serviceInfoContainer}>
          <Image source={serviceDetailImage} style={styles.serviceImage} />
          <View style={styles.serviceDetails}>
            <Text style={styles.serviceName}>Car Wash</Text>
            <Text style={styles.serviceType}>Eco Wash Exterior</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>AED 300.00</Text>
            <Text style={styles.oldPrice}>AED 300.00</Text>
          </View>
        </View>

        <View style={styles.addOnsContainer}>
          <Text style={styles.addOnsTitle}>Service Description</Text>
          {[1, 2, 3, 4].map((_, index) => (
            <TouchableOpacity key={index} style={styles.addOnCard} onPress={() => toggleCheckbox(index)} activeOpacity={0.8}>
              <View style={styles.addOnInfo}>
                <Text style={styles.addOnName}>Interior Cleaning</Text>
                <Text style={styles.addOnDescription}>Deep clean seats, dashboard & carpets</Text>
                <View style={styles.durationContainer}>
                  <Ionicons name="time-outline" size={16} color="#888" />
                  <Text style={styles.addOnDuration}>20-30 min</Text>
                </View>
              </View>
              <View style={styles.addOnActions}>
                <View style={styles.addOnPriceContainer}>
                  <Text style={styles.addOnPrice}>AED 50</Text>
                  <Text style={styles.addOnOldPrice}>AED 65</Text>
                  <Text style={styles.addOnDiscount}>23% OFF</Text>
                </View>
                <View
                  style={[styles.checkbox, checked.includes(index) && styles.checked]}
                >
                  {checked.includes(index) && <Ionicons name="checkmark" size={20} color="#fff" />}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.confirmButton} onPress={() => router.push('/booking-summary')}>
        <Text style={styles.confirmButtonText}>Confirm Booking</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingVertical: 40,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 40,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  stepIndicatorContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  stepIndicatorActive: {
    width: 30,
    height: 5,
    borderRadius: 5,
    backgroundColor: '#FF7D2E',
    marginHorizontal: 2,
  },
  stepIndicatorInactive: {
    width: 30,
    height: 5,
    borderRadius: 5,
    backgroundColor: '#FF7D2E40',
    marginHorizontal: 2,
  },
  serviceInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  serviceImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  serviceDetails: {
    flex: 1,
    marginLeft: 15,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  serviceType: {
    color: '#888',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF7D2E',
  },
  oldPrice: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  addOnsContainer: {
    padding: 20,
  },
  addOnsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  addOnCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF0E5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  addOnInfo: {
    flex: 1,
  },
  addOnName: {
    fontWeight: 'bold',
  },
  addOnDescription: {
    color: '#888',
    fontSize: 12,
    marginVertical: 5,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addOnDuration: {
    color: '#888',
    fontSize: 12,
    marginLeft: 5,
  },
  addOnActions: {
    alignItems: 'flex-end',
  },
  addOnPriceContainer: {
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  addOnPrice: {
    color: '#FF7D2E',
    fontWeight: 'bold',
  },
  addOnOldPrice: {
    textDecorationLine: 'line-through',
    color: '#888',
    fontSize: 12,
  },
  addOnDiscount: {
    backgroundColor: '#FF7D2E',
    color: '#fff',
    fontSize: 10,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#FF7D2E',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: '#FF7D2E',
  },
  confirmButton: {
    backgroundColor: '#FF7D2E',
    padding: 20,
    alignItems: 'center',
    margin: 20,
    borderRadius: 10,
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default AddonScreen;