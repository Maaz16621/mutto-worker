import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function ConfirmationScreen() {
  const router = useRouter();

  const handleClose = () => {
    router.replace('/(tabs)'); // Navigate to home screen
  };

  return (
    <View style={styles.container}>
      {/* Header with X button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <Ionicons name="close" size={28} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Confirmation Message */}
        <View style={styles.messageContainer}>
          <Image
            source={require('../assets/images/mutto_van.png')}
            style={styles.vanImage}
          />
          <Text style={styles.confirmationTitle}>Booking Confirmed!</Text>
          <Text style={styles.confirmationText}>
            We’ve got your request-
            Mutto is on way
          </Text>
          <TouchableOpacity style={styles.statusButton}>
            <Text style={styles.statusButtonText}>Check status of your service here</Text>
          </TouchableOpacity>
        </View>

        {/* Popular Services Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Services</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <PopularCard title="Exterior Car Wash" rating={4.5} />
            <PopularCard title="Interior Car Wash" rating={4.8} />
            <PopularCard title="Tire Repair" rating={4.2} />
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

function PopularCard({ title, rating }: { title: string; rating: number }) {
  return (
    <View style={styles.popularCard}>
      <Image
        source={require('../assets/images/default-service.png')}
        style={styles.popularImage}
      />
      <View style={styles.popularHeaderRow}>
        <Text style={styles.popularTitle}>{title}</Text>
        <View style={styles.popularRatingGroup}>
          <Ionicons name="star" size={12} color="#F6C34F" />
          <Text style={styles.popularRating}>{rating.toFixed(1)}</Text>
        </View>
      </View>
      <View style={styles.popularDetailsRow}>
        <Text style={styles.popularSub}>On your location</Text>
        <View style={styles.popularTimeGroup}>
          <Ionicons name="time" size={14} color="#ff7a00" />
          <Text style={styles.popularSub}>30 Mins</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.popularBtn}>
        <Text style={styles.popularBtnText}>Get Service</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 50,
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 16,
    alignItems: 'flex-end',
  },
  closeButton: {
    padding: 8,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  messageContainer: {
    alignItems: 'center',
    padding: 20,
  },
  vanImage: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
  },
  confirmationTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  confirmationText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20, // Added margin to separate text from button
  },
  statusButton: {
    backgroundColor: '#FF7D2E',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  statusButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    padding: 16,
    marginTop: 20,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 12,
  },
  popularCard: {
    width: 180,
    backgroundColor: '#f9f9f9',
    marginRight: 12,
    padding: 10,
    borderRadius: 12,
  },
  popularImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
  },
  popularHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 8,
  },
  popularTitle: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  popularRatingGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  popularRating: {
    fontSize: 14,
    color: '#000',
    marginLeft: 4,
  },
  popularDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 4,
  },
  popularTimeGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  popularSub: {
    color: '#666',
    fontSize: 12,
    marginLeft: 4,
  },
  popularBtn: {
    marginTop: 6,
    backgroundColor: '#ff7a00',
    paddingVertical: 5,
    borderRadius: 6,
  },
  popularBtnText: {
    color: '#fff',
    textAlign: 'center',
  },
});