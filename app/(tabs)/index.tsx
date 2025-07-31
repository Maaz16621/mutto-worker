import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Swiper from 'react-native-swiper';
import NotificationBell from '../../components/NotificationBell';
import CustomAlert from '../../components/ui/CustomAlert';
import { auth } from '../../firebase';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);



  const handleLogout = () => {
    setShowLogoutAlert(true);
  };

  const confirmLogout = async () => {
    setShowLogoutAlert(false);
    try {
      console.log("Attempting to sign out...");
      await signOut(auth);
      console.log("Sign out successful, redirecting...");
      router.replace('/welcome');
    } catch (error) {
      console.error("Error logging out:", error);
      // Optionally, show an alert to the user
    }
  };

  const cancelLogout = () => {
    setShowLogoutAlert(false);
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.profileRow}>
             <Image
              source={require('../../assets/images/default-user.png')}
              style={styles.profilePic}/>
            <View>
              <Text style={styles.heyText}>Hey, Max</Text>
              <Text style={styles.locationText}>
                <Ionicons name="location-sharp" size={14} color="#ff7a00" /> Deira, Dubai
              </Text>
            </View>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity onPress={handleLogout}>
              <Ionicons name="log-out-outline" size={24} color="#000" style={{ marginRight: 10 }} />
            </TouchableOpacity>
            <NotificationBell />
          </View>
        </View>
        <CustomAlert
          visible={showLogoutAlert}
          title="Confirm Logout"
          message="Are you sure?"
          onConfirm={confirmLogout}
          onCancel={cancelLogout}
          showConfirmCancel={true}
        />

        {/* Slider */}
       <View style={styles.swiperContainer}>
  <Swiper
    autoplay
    showsPagination
    height={170}
    
    dotStyle={styles.dot}
    activeDotStyle={styles.activeDot}
    paginationStyle={{ bottom: 10 }} // Adjust this value as needed
  >
    <Image
      source={require('../../assets/images/default-service.png')}
      style={styles.slideImage}
    />
    <Image
      source={require('../../assets/images/default-service.png')}
      style={styles.slideImage}
    />
  </Swiper>
</View>


        <View style={styles.offerBanner}>
          <Text style={styles.offerText}>30% OFF*</Text>
          <Text style={styles.offerSubText}>Car Wash & Detailing</Text>
          <TouchableOpacity style={styles.offerBtn}>
            <Text style={styles.offerBtnText}>Grab Offer</Text>
          </TouchableOpacity>
        </View>

        {/* Services Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Services</Text>
          <View style={styles.grid}>
            <ServiceCard icon="car" label="Car Wash" />
            <ServiceCard icon="tools" label="Car Repair" />
            <ServiceCard icon="car-electric" label="Ev Services" />
            <ServiceCard icon="steering" label="Book Driver" />
            <ServiceCard icon="clipboard-list" label="Others" />
            <ServiceCard icon="search" label="Search" onPress={() => router.push('/(tabs)/search')} />
          </View>
        </View>

        {/* Popular Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Services</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <PopularCard title="Exterior Car Wash" rating={4.5} />
            <PopularCard title="Interior Car Wash" rating={4.8} />
            <PopularCard title="Tire Repair" rating={4.2} />
          </ScrollView>
        </View>
      </ScrollView>

      {/* Bottom Nav (layout-based) */}
    
    </View>
  );
}

function ServiceCard({ icon, label, onPress }: { icon: string; label: string; onPress?: () => void }) {
  const IconComp = icon === 'car-electric' ? MaterialCommunityIcons : FontAwesome5;
  return (
    <TouchableOpacity style={styles.serviceCard} onPress={onPress} activeOpacity={0.7}>
      <IconComp name={icon as any} size={40} color="#ff7a00" />
      <Text style={styles.serviceLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

function PopularCard({ title, rating }: { title: string; rating: number }) {
  return (
    <View style={styles.popularCard}>
      <Image
        source={require('../../assets/images/default-service.png')}
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
  wrapper: {
    flex: 1,
    backgroundColor: '#FEF3F0',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  heyText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  locationText: {
    color: '#888',
    fontSize: 13,
  },
    swiperContainer: {
    height: 210, // 170 for image + space for dots
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
 
  dot: {
    backgroundColor: 'rgba(255, 125, 46, 0.25)', // 25% opacity
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  activeDot: {
    backgroundColor: '#FF7D2E',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  swiper: {
    height: 180,
  },

  pagination: {
    position: 'relative',
  },
  slideImage: {
    width: width - 32,
    height: 180,
    borderRadius: 12,
    marginHorizontal: 16,
  },
  offerBanner: {
    position: 'absolute',
    top: 160,
    left: 32,
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  offerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  offerSubText: {
    color: '#333',
    marginBottom: 5,
  },
  offerBtn: {
    backgroundColor: '#000',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  offerBtnText: {
    color: '#fff',
  },
  section: {
    padding: 16,
    marginTop: 10,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
serviceCard: {
  width: (width - 32 - 24) / 3, // (screen_width - section_padding_x2 - margin_x2) / 3
  minWidth: (width / 2) - 20, // Ensure it takes at least half width on smaller screens
  backgroundColor: '#fff4ed',
  alignItems: 'center',
  padding: 16,
  borderRadius: 16,
  marginBottom: 12, // Spacing between rows
},
  serviceLabel: {
    marginTop: 8,
    color: '#333',
    fontWeight: '600',
    textAlign: 'center',
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
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fffaf5',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});