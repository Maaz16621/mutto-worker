import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const PaymentScreen = () => {
  const router = useRouter();

  return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Choose Payment Method</Text>
        </View>

        <ScrollView contentContainerStyle={styles.contentContainer}>
          <TouchableOpacity style={styles.paymentButtonWhite}>
            <Ionicons name="cash-outline" size={24} color="#FF7D2E" />
            <Text style={styles.paymentButtonTextWhite}>Cash</Text>
          </TouchableOpacity>
        </ScrollView>

        <TouchableOpacity style={styles.payButton} onPress={() => router.push('/confirmation-screen')}>
          <Text style={styles.payButtonText}>Pay 300.00</Text>
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
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
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
  contentContainer: {
    padding: 20,
  },
  paymentButtonWhite: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0E5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  paymentButtonTextWhite: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
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

export default PaymentScreen;