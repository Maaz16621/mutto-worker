import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  ListRenderItem,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import BubbleSVG from '../../components/BubbleSVG';
import SlideUpView from '../../components/SlideUpView';
import { IconSymbol } from '../../components/ui/IconSymbol';

const serviceImage = require('../../assets/images/service-image.png');

type Item = {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  price: number;
};

const DATA: Item[] = [
  { id: '1', name: 'Exterior Wash', description: 'A thorough wash of the car exterior.', categoryId: '1', price: 50 },
  { id: '2', name: 'Interior Detailing', description: 'Complete cleaning of the car interior.', categoryId: '2', price: 120 },
  { id: '3', name: 'Engine Repair', description: 'Fixing engine-related issues.', categoryId: '3', price: 200 },
  { id: '4', name: 'Full Service Wash', description: 'Includes both interior and exterior cleaning.', categoryId: '1', price: 150 },
  { id: '5', name: 'Wax & Polish', description: 'Protective wax and polish for the car body.', categoryId: '2', price: 80 },
  { id: '6', name: 'Brake Service', description: 'Inspection and repair of brake systems.', categoryId: '3', price: 300 },
];

const subCategories = [
  { id: '1', name: 'Car Wash', icon: 'car-outline' as const },
  { id: '2', name: 'Detailing', icon: 'water-outline' as const },
  { id: '3', name: 'Repair', icon: 'build-outline' as const },
];

const mainCategories = [
  { id: 'all', name: 'All' },
  { id: '1', name: 'Automotive' },
  { id: '2', name: 'Home Services' },
  { id: '3', name: 'Personal Care' },
];

const SearchScreen = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('1');
  const [isSlideUpVisible, setIsSlideUpVisible] = useState(false);
  const [selectedFilterCategory, setSelectedFilterCategory] = useState('1');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [timeRange, setTimeRange] = useState([0, 120]);

  const filteredData = DATA.filter(item =>
    (selectedFilterCategory === 'all' || item.categoryId === selectedFilterCategory) &&
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderItem: ListRenderItem<Item> = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => router.push({ pathname: '/service-detail', params: item })}
    >
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
          <Ionicons name="heart-outline" size={24} color="red" />
        </TouchableOpacity>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
           <View style={styles.header}>
          <View style={styles.profileRow}>
          
            <View>
              <Text style={styles.heyText}>Hey, Max</Text>
             <Text style={styles.locationText}>Your Car. Our Care.
              {'\n'} 
              Anytime. Anywhere.</Text>
            </View>
          </View>
          <View style={styles.headerIcons}>
           
            <Ionicons name="notifications-outline" size={24} color="#000" />
          </View>
        </View>
      <View style={styles.searchBar}>
        <IconSymbol name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search cars"
          value={searchText}
          onChangeText={setSearchText}
          placeholderTextColor="#888"
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={() => setSearchText('')}>
            <IconSymbol name="close.circle" size={20} color="#888"  style={styles.clearIcon} />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => setIsSlideUpVisible(true)}>
          <Ionicons name="options-outline" rotation={90} size={24} color="#888" style={styles.filterIcon} />
        </TouchableOpacity>
      </View>
      </View>
      <View style={styles.subCategoryContainer}>
        <Text style={styles.subCategoryTitle}>Our Car wash</Text>
        <FlatList
          data={subCategories}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.subCategoryButton}
              onPress={() => setSelectedCategory(item.id)}>
              <View style={[
                styles.subCategoryIconContainer,
                selectedCategory === item.id && styles.selectedSubCategoryItem,
              ]}>
                <Ionicons
                  name={item.icon}
                  size={24}
                  color='#FF7D2E'
                />
              </View>
              <Text style={[
                styles.subCategoryItemText,
                selectedCategory === item.id && styles.selectedSubCategoryItemText,
              ]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.subCategoryList}
        />
      </View>
      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
        ListFooterComponent={() => (
          <View style={styles.popularCardContainer}>
            <Text style={styles.sectionTitle}>Popular Services</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <PopularCard title="Exterior Car Wash" rating={4.5} />
              <PopularCard title="Interior Car Wash" rating={4.8} />
              <PopularCard title="Tire Repair" rating={4.2} />
            </ScrollView>
          </View>
        )}
      />
      <SlideUpView isVisible={isSlideUpVisible} onClose={() => setIsSlideUpVisible(false)}>
        <View style={styles.filterContent}>
          <Text style={styles.filterTitle}>Filter Options</Text>

          <Text style={styles.filterSectionTitle}>Categories</Text>
          <View style={styles.filterCategoriesContainer}>
            {mainCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.filterCategoryButton,
                  selectedFilterCategory === category.id && styles.selectedFilterCategoryButton,
                ]}
                onPress={() => setSelectedFilterCategory(category.id)}
              >
                <Text
                  style={[
                    styles.filterCategoryText,
                    selectedFilterCategory === category.id && styles.selectedFilterCategoryText,
                  ]}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.filterSectionTitle}>Price Range: AED {priceRange[0].toFixed(0)} - AED {priceRange[1].toFixed(0)}</Text>
          <MultiSlider
            values={[priceRange[0], priceRange[1]]}
            sliderLength={280} // Adjust as needed
            onValuesChangeFinish={setPriceRange} // Changed to onValuesChangeFinish
            min={0}
            max={500}
            step={10}
            allowOverlap
            snapped
            minMarkerOverlapDistance={10}
            customMarker={() => (
              <View style={styles.customMarker} />
            )}
            selectedStyle={{ backgroundColor: '#FF7D2E' }}
            unselectedStyle={{ backgroundColor: '#d3d3d3' }}
            containerStyle={styles.sliderContainer} // Added containerStyle
          />

          <Text style={styles.filterSectionTitle}>Time Range: {timeRange[0].toFixed(0)} - {timeRange[1].toFixed(0)} Mins</Text>
          <MultiSlider
            values={[timeRange[0], timeRange[1]]}
            sliderLength={280} // Adjust as needed
            onValuesChangeFinish={setTimeRange} // Changed to onValuesChangeFinish
            min={0}
            max={120}
            step={5}
            allowOverlap
            snapped
            minMarkerOverlapDistance={10}
            customMarker={() => (
              <View style={styles.customMarker} />
            )}
            selectedStyle={{ backgroundColor: '#FF7D2E' }}
            unselectedStyle={{ backgroundColor: '#d3d3d3' }}
            containerStyle={styles.sliderContainer} // Added containerStyle
          />

          <TouchableOpacity style={styles.applyFilterButton} onPress={() => {
            // Apply filters logic here
            setIsSlideUpVisible(false);
          }}>
            <Text style={styles.applyFilterButtonText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </SlideUpView>
    </View>
  );
};

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
  container: {
    flex: 1,
    backgroundColor: '#FEF3F0',
  },
  topContainer: {
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 50,
  },
  profileRow: {
    flexDirection: 'row',
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
    color: '#000',
    fontSize: 28,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 125, 46, 0.08)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
    marginBottom: 8,
    marginHorizontal: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  clearIcon: {
    marginLeft: 8,
  },
  filterIcon: {
    marginLeft: 8,
  },
  subCategoryContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
  },
  subCategoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subCategoryList: {
    gap: 16,
  },
  subCategoryButton: {
    alignItems: 'center',
  },
  subCategoryIconContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 50,
    padding: 12,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedSubCategoryItem: {
    borderColor: '#FF7D2E',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  subCategoryItemText: {
    fontSize: 12,
    fontWeight: '600',
  },
  selectedSubCategoryItemText: {
    color: '#FF7D2E',
    fontWeight: 'bold',
  },
  listContent: {
    backgroundColor: '#fff',
    paddingTop:20,
  },
  itemContainer: {
    borderRadius: 8,
    marginBottom: 12,
    marginHorizontal: 20,
    overflow: 'hidden',
    height: 120, // Set a fixed height for the item container
  },
  gradientBackground: {
    flexDirection: 'row',
    flex: 1,
    borderRadius: 10,
    paddingLeft: 20, // Space for circles and padding
  
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
  itemDescription: {
    fontSize: 14,
    color: '#666',
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
  popularCardContainer: {
    marginTop: 10,
    marginLeft: 20,
    backgroundColor: '#fff',
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
    sectionTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 12,
  },
  filterContent: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  filterTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
  },
  filterCategoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 10,
  },
  filterCategoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
     borderWidth: 1,
    borderColor: '#FF7D2E',
    backgroundColor: '#fff',
  },
  selectedFilterCategoryButton: {
    backgroundColor: '#FF7D2E',
  },
  filterCategoryText: {
    color: '#FF7D2E',
    fontWeight: 'bold',
  },
  selectedFilterCategoryText: {
    color: '#fff',
  },
  applyFilterButton: {
    backgroundColor: '#FF7D2E',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  applyFilterButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sliderContainer: {
    marginHorizontal: 10,
    marginBottom: 0,
  },
  customMarker: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: '#FF7D2E',
    borderWidth: 2,
    borderColor: '#fff',
  },
});

export default SearchScreen;
