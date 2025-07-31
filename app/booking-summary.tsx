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
import { WebView } from 'react-native-webview';
import CouponModal from '../components/ui/CouponModal';

const serviceDetailImage = require('../assets/images/service-image.png');

const BookingSummaryScreen = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const handleApplyCoupon = (coupon: string) => {
    setAppliedCoupon(coupon);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booking Summary</Text>
        <View style={styles.stepIndicatorContainer}>
          <View style={styles.stepIndicatorActive} />
          <View style={styles.stepIndicatorActive} />
          <View style={styles.stepIndicatorActive} />
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

        <View style={styles.locationContainer}>
          <View style={styles.locationHeader}>
            <Ionicons name="location-outline" size={24} color="#000" />
            <Text style={styles.locationTitle}>Your location</Text>
            <TouchableOpacity onPress={() => router.push('/SelectLocationScreen')}>
              <Ionicons name="pencil" size={20} color="#000" />
            </TouchableOpacity>
          </View>
          <View style={styles.mapContainer}>
            <WebView
              source={{ uri: 'https://www.openstreetmap.org/export/embed.html?bbox=55.2155,25.1535,55.2355,25.1735&layer=mapnik' }}
              style={styles.map}
            />
          </View>
          <Text style={styles.address}>Al Khail Gate, Phase 2, Building 38</Text>
          <Text style={styles.address}>Dubai</Text>
        </View>

        <View style={styles.summaryContainer}>
          <View style={styles.summaryHeader}>
            <Ionicons name="document-text-outline" size={24} color="#000" />
            <Text style={styles.summaryTitle}>Service Summary</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Service</Text>
            <Text style={styles.summaryText}>Eco Wash Exterior</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Subtotal</Text>
            <Text style={styles.summaryText}>AED 300.00</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Service Fee</Text>
            <Text style={styles.summaryText}>AED 20.00</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>VAT</Text>
            <Text style={styles.summaryText}>AED 20.00</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Discount</Text>
            {appliedCoupon ? (
              <Text style={styles.appliedCouponText}>- AED 10.00</Text>
            ) : (
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text style={styles.applyCouponText}>Apply Coupon</Text>
              </TouchableOpacity>
            )}
          </View>
          {appliedCoupon && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>Coupon Code</Text>
              <Text style={styles.appliedCouponText}>{appliedCoupon}</Text>
            </View>
          )}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.payButton} onPress={() => router.push('/payment-screen')}>
        <Text style={styles.payButtonText}>Pay Now</Text>
      </TouchableOpacity>

      <CouponModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onApply={handleApplyCoupon}
      />
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
  locationContainer: {
    padding: 20,
    backgroundColor: '#FFF0E5',
    borderRadius: 10,
    margin: 20,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  locationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    flex: 1,
  },
  mapContainer: {
    height: 150,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  map: {
    flex: 1,
  },
  address: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  paymentContainer: {
    padding: 20,
    backgroundColor: '#FFF0E5',
    borderRadius: 10,
    margin: 20,
  },
  paymentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  paymentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    flex: 1,
  },
  changeText: {
    color: '#FF7D2E',
    fontWeight: 'bold',
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
  },
  paymentPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  summaryContainer: {
    padding: 20,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  summaryText: {
    fontSize: 16,
    color: '#888',
  },
  applyCouponText: {
    color: '#FF7D2E',
    fontWeight: 'bold',
  },
  appliedCouponText: {
    color: '#000',
    fontWeight: 'bold',
  },
  payButton: {
    backgroundColor: '#FF7D2E',
    padding: 20,
    alignItems: 'center',
    margin: 20,
    borderRadius: 10,
  },
  payButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default BookingSummaryScreen;
