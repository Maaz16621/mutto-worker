import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
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
const carWashImages = [
  require('../assets/images/service-image.png'),
  require('../assets/images/welcome/img_bg.png'),
  require('../assets/images/default-service.png'),
  require('../assets/images/default-user.png'),
];

const ReviewCard = ({ image, name, review }) => (
  <View style={styles.reviewCard}>
    <Image source={image} style={styles.reviewImage} />
    <View style={styles.reviewTextContainer}>
      <Text style={styles.reviewText}>{review}</Text>
      <View style={styles.reviewNameContainer}>
  <Text style={styles.reviewName}>{name}</Text>
      <View style={styles.reviewStars}>
        {[1, 2, 3, 4, 5].map((i) => (
          <Ionicons key={i} name="star" size={16} color="#FFC700" />
        ))}
      </View>
      </View>
    
    </View>
  </View>
);

const ServiceDetailScreen = () => {
  const router = useRouter();
  const item = useLocalSearchParams();
  const [selectedImage, setSelectedImage] = useState(serviceDetailImage);
  const [activeTab, setActiveTab] = useState('Description');

  const renderContent = () => {
    switch (activeTab) {
      case 'Description':
        return (
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>Service Description</Text>
            <Text style={styles.descriptionText}>
              Our premium exterior car wash service provides a comprehensive cleaning experience that will leave your vehicle looking spotless and refreshed. We use eco-friendly products and advanced techniques...
            </Text>
            <TouchableOpacity>
              <Text style={styles.readMore}>Read More</Text>
            </TouchableOpacity>

            <Text style={styles.whatsIncludedTitle}>What's Included</Text>
            <View style={styles.includedItem}>
              <Ionicons name="checkmark-circle" size={24} color="#FF7D2E" />
              <Text style={styles.includedText}>Window cleaning (interior & exterior)</Text>
            </View>
            <View style={styles.includedItem}>
              <Ionicons name="checkmark-circle" size={24} color="#FF7D2E" />
              <Text style={styles.includedText}>Wheel and tire deep cleaning</Text>
            </View>
            <View style={styles.includedItem}>
              <Ionicons name="checkmark-circle" size={24} color="#FF7D2E" />
              <Text style={styles.includedText}>Window cleaning (interior & exterior)</Text>
            </View>
            <View style={styles.includedItem}>
              <Ionicons name="checkmark-circle" size={24} color="#FF7D2E" />
              <Text style={styles.includedText}>Dashboard and interior wipe down</Text>
            </View>

            <Text style={styles.additionalInfoTitle}>Additional Information</Text>
          <View style={styles.additionalInfoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Service Type</Text>
              <Text style={styles.infoValue}>Exterior Wash</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Duration</Text>
              <Text style={styles.infoValue}>45-60 minutes</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Eco-Friendly</Text>
              <Text style={styles.infoValue}>Yes</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Warranty</Text>
              <Text style={styles.infoValue}>7 days</Text>
            </View>
</View>
            <Text style={styles.importantNotesTitle}>Important Notes</Text>
            <View style={styles.notesList}>
              <Text style={styles.noteItem}>• Please ensure your vehicle is accessible and remove any valuable items</Text>
              <Text style={styles.noteItem}>• Service may take longer for heavily soiled vehicles</Text>
              <Text style={styles.noteItem}>• Weather conditions may affect service availability</Text>
            </View>
          </View>
        );
      case 'Reviews':
        return (
          <View style={styles.reviewsContainer}>
            <Text style={styles.reviewsTitle}>See what others have to say</Text>
            <ReviewCard
              image={require('../assets/images/default-user.png')}
              name="Ahmad"
              review="They came right to my location and left my car spotless inside and out. Definitely the easiest and best car wash experience I've had in the UAE!"
            />
            <ReviewCard
              image={require('../assets/images/default-user.png')}
              name="Fatima"
              review="Excellent service and very professional staff. My car looks brand new!"
            />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image source={selectedImage} style={styles.mainImage} />
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#FF7D2E" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.favoriteButton}>
            <Ionicons name="heart" size={24} color="red" />
          </TouchableOpacity>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.thumbnailScrollView}
            contentContainerStyle={styles.thumbnailContainer}
          >
            {carWashImages.map((img, index) => (
              <TouchableOpacity key={index} onPress={() => setSelectedImage(img)}>
                <Image source={img} style={styles.thumbnail} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{item.name}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#FFC700" />
              <Text style={styles.ratingText}>5.0 (124)</Text>
            </View>
          </View>
          <View style={styles.priceRow}>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>AED {item.price}</Text>
              <Text style={styles.oldPrice}>AED 320</Text>
            </View>
            <View style={styles.durationContainer}>
              <Ionicons name="time-outline" size={16} color="#888" />
              <Text style={styles.durationText}>45-60 minutes</Text>
            </View>
          </View>
        </View>

        <View style={styles.offersContainer}>
          <View style={styles.offerCard}>
            <View style={styles.offerIconContainer}>
              <Text style={styles.offerIcon}>%</Text>
            </View>
            <View>
              <Text style={styles.offerTitle}>30% OFF</Text>
              <Text style={styles.offerSubtitle}>On first wash</Text>
            </View>
          </View>
          <View style={styles.offerCard}>
            <View style={styles.offerIconContainer}>
              <Text style={styles.offerIcon}>B</Text>
            </View>
            <View>
              <Text style={styles.offerTitle}>Get 10% OFF</Text>
              <Text style={styles.offerSubtitle}>Refer Now</Text>
            </View>
          </View>
        </View>

        <View style={styles.tabsContainer}>
       
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Description' && styles.activeTab]}
            onPress={() => setActiveTab('Description')}
          >
            <Text style={activeTab === 'Description' ? styles.activeTabText : styles.tabText}>Description</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Reviews' && styles.activeTab]}
            onPress={() => setActiveTab('Reviews')}
          >
            <Text style={activeTab === 'Reviews' ? styles.activeTabText : styles.tabText}>Reviews</Text>
          </TouchableOpacity>
        </View>
        {renderContent()}
      </ScrollView>
      <TouchableOpacity style={styles.bookNowButton} onPress={() => router.push('/booking')}>
        <Text style={styles.bookNowButtonText}>Book Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 50,
    backgroundColor: '#FEF3F0',
  },
  imageContainer: {
    height: 250,
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 20,
  },
  favoriteButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 20,
  },
  thumbnailScrollView: {
    position: 'absolute',
    bottom: 10,
alignSelf: 'center',
 },
  thumbnailContainer: {
    justifyContent: 'center',
    padding: 5,
    gap: 5,
    backgroundColor: '#FF7D2E99',
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 5,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    color: '#888',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF7D2E',
  },
  oldPrice: {
    marginLeft: 8,
    textDecorationLine: 'line-through',
    color: '#888',
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationText: {
    marginLeft: 4,
    color: '#888',
  },
  offersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 5,
  },
  offerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0E5',
    padding: 10,
    borderRadius: 10,
  },
  offerIconContainer: {
    backgroundColor: '#FF7D2E',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  offerIcon: {
    color: '#fff',
    fontWeight: 'bold',
  },
  offerTitle: {
    fontWeight: 'bold',
  },
  offerSubtitle: {
    color: '#888',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    paddingVertical: 15,
    flex: 1,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#FF7D2E',
  },
  tabText: {
    color: '#888',
  },
  activeTabText: {
    color: '#FF7D2E',
    fontWeight: 'bold',
  },
  contentText: {
    padding: 20,
    backgroundColor: '#fff',
  },
  addOnsContainer: {
    padding: 20,
    backgroundColor: '#fff',
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
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
  },
  addOnName: {
    fontWeight: 'bold',
  },
  addOnDescription: {
    color: '#888',
    fontSize: 12,
  },
  addOnDuration: {
    color: '#888',
    fontSize: 12,
  },
  addOnPriceContainer: {
    alignItems: 'flex-end',
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
  },
  bookNowButton: {
    backgroundColor: '#FF7D2E',
    padding: 20,
    alignItems: 'center',
    margin: 20,
    borderRadius: 10,
  },
  bookNowButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  descriptionContainer: {
    padding: 20,
    backgroundColor: '#fff',
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
  },
  readMore: {
    color: '#FF7D2E',
    fontWeight: 'bold',
    marginTop: 5,
  },
  whatsIncludedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  includedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  includedText: {
    marginLeft: 10,
    fontSize: 14,
  },
  additionalInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  importantNotesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  notesList: {
    // Add styles for the notes list if needed
  },
  noteItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  reviewsContainer: {
    padding: 20,
    backgroundColor: '#fff',
  },
  reviewsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  reviewCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF0E5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  reviewImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  reviewTextContainer: {
    flex: 1,
  },
  reviewText: {
    fontSize: 14,
    color: '#333',
    fontStyle: 'italic',
  },
  reviewName: {
    fontWeight: 'bold',
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  reviewNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  reviewStars: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  additionalInfoContainer: { 
    padding: 10,
    backgroundColor: '#FEF3F0',
    borderRadius: 10,
  },
  
});

export default ServiceDetailScreen;