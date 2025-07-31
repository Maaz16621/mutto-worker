



import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, BackHandler, FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Portal } from 'react-native-paper';
import { WebView } from 'react-native-webview';
import CustomAlert from '../components/ui/CustomAlert';

const formatAddress = (address: Location.LocationGeocodedAddress) => {
  const parts = [];
  if (address.name) parts.push(address.name);
  if (address.street) parts.push(address.street);
  if (address.city) parts.push(address.city);
  if (address.region && address.region !== address.city) parts.push(address.region);
  if (address.country) parts.push(address.country);

  if (parts.length > 0) {
    return parts.join(', ');
  } else if (address.latitude && address.longitude) {
    return `Lat: ${address.latitude.toFixed(4)}, Lon: ${address.longitude.toFixed(4)}`;
  } else {
    return 'Unknown Location';
  }
};

import { addDoc, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { auth, db } from '../firebase';

export default function SelectLocationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const webViewRef = useRef(null);
  const [editingAddress, setEditingAddress] = useState(null);
  const [locationName, setLocationName] = useState('');
  const [saveAs, setSaveAs] = useState('Home'); // 'Home', 'Office', 'Others'
  const [otherLocationName, setOtherLocationName] = useState('');
  const [currentLatitude, setCurrentLatitude] = useState(0);
  const [currentLongitude, setCurrentLongitude] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [isWebViewLoaded, setIsWebViewLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [existingAddresses, setExistingAddresses] = useState([]);

  const user = auth.currentUser;

  useEffect(() => {
    const backAction = () => {
      router.back();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    const fetchAddresses = async () => {
      if (user) {
        const q = query(collection(db, 'users', user.uid, 'addresses'));
        const querySnapshot = await getDocs(q);
        const addresses = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setExistingAddresses(addresses);
      }
    };
    fetchAddresses();
  }, [user]);

  useEffect(() => {
    const initializeLocation = async () => {
      if (params.address) {
        const addressToEdit = JSON.parse(params.address as string);
        setEditingAddress(addressToEdit);
        setLocationName(addressToEdit.address);
        setSaveAs(addressToEdit.type);
        if (addressToEdit.type === 'Others') {
          setOtherLocationName(addressToEdit.name);
        }
        setCurrentLatitude(addressToEdit.latitude);
        setCurrentLongitude(addressToEdit.longitude);
      } else {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setAlertTitle('Permission Denied');
          setAlertMessage('Permission to access location was denied.');
          setAlertVisible(true);
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        console.log('Initial Location:', location.coords.latitude, location.coords.longitude);
        setCurrentLatitude(location.coords.latitude);
        setCurrentLongitude(location.coords.longitude);
        const address = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        console.log('Reverse Geocoded Address (Initial):', JSON.stringify(address, null, 2));
        if (address && address.length > 0) {
          setLocationName(formatAddress(address[0]));
        }
      }
    };

    initializeLocation();
  }, [params.address]);

  useEffect(() => {
    if (isWebViewLoaded && currentLatitude !== 0 && currentLongitude !== 0 && webViewRef.current) {
      webViewRef.current.postMessage(JSON.stringify({ type: 'setLocation', latitude: currentLatitude, longitude: currentLongitude }));
    }
  }, [isWebViewLoaded, currentLatitude, currentLongitude]);

  const handleLocateMe = async () => {
    let location = await Location.getCurrentPositionAsync({});
    console.log('Locate Me Location:', location.coords.latitude, location.coords.longitude);
    setCurrentLatitude(location.coords.latitude);
    setCurrentLongitude(location.coords.longitude);
    const address = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    console.log('Reverse Geocoded Address (Locate Me):', JSON.stringify(address, null, 2));
    if (address && address.length > 0) {
      setLocationName(formatAddress(address[0]));
    }
  };

  const onMessage = async (event: any) => {
    const data = JSON.parse(event.nativeEvent.data);
    console.log('Message from WebView:', data);
    if (data.type === 'mapClick') {
      setCurrentLatitude(data.latitude);
      setCurrentLongitude(data.longitude);
      const address = await Location.reverseGeocodeAsync({ latitude: data.latitude, longitude: data.longitude });
      console.log('Reverse Geocoded Address (Map Click):', JSON.stringify(address, null, 2));
      if (address && address.length > 0) {
        setLocationName(formatAddress(address[0]));
      }
    } else if (data.type === 'mapUpdated') {
      console.log('Map updated in WebView to:', data.latitude, data.longitude);
    }
  };

  const handleSaveAddress = async () => {
    if (!user) {
      setAlertTitle('Error');
      setAlertMessage('User not logged in.');
      setAlertVisible(true);
      return;
    }

    if (!editingAddress) {
      const isHomeOrOffice = saveAs === 'Home' || saveAs === 'Office';
      const addressTypeExists = existingAddresses.some(addr => addr.type === saveAs);
      if (isHomeOrOffice && addressTypeExists) {
        setAlertTitle('Address Exists');
        setAlertMessage(`You already have an address saved as ${saveAs}. Please use a different type or edit the existing one.`);
        setAlertVisible(true);
        return;
      }
    }

    setIsSaving(true);

    const addressData = {
      name: saveAs === 'Others' ? otherLocationName : saveAs,
      address: locationName,
      latitude: currentLatitude,
      longitude: currentLongitude,
      type: saveAs,
    };

    try {
      if (editingAddress) {
        const addressRef = doc(db, 'users', user.uid, 'addresses', editingAddress.id);
        await updateDoc(addressRef, { ...addressData, updatedAt: new Date() });
        setAlertTitle('Address Updated');
        setAlertMessage('Your address has been updated successfully.');
      } else {
        await addDoc(collection(db, 'users', user.uid, 'addresses'), {
          ...addressData,
          createdAt: new Date(),
        });
        setAlertTitle('Address Saved');
        setAlertMessage('Your address has been saved successfully.');
      }
      setAlertVisible(true);
    } catch (error) {
      console.error('Error saving address:', error);
      setAlertTitle('Error');
      setAlertMessage('Failed to save address.');
      setAlertVisible(true);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <WebView
        ref={webViewRef}
        originWhitelist={['*']}
        source={require('../assets/html/map.html')}
        style={styles.map}
        onMessage={onMessage}
        onLoadEnd={() => setIsWebViewLoaded(true)}
      />

      <TouchableOpacity style={styles.locateMeButton} onPress={handleLocateMe}>
        <Ionicons name="locate" size={24} color="#fff" />
        <Text style={styles.locateMeButtonText}>Locate me</Text>
      </TouchableOpacity>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingContainer}
      >
        <View style={styles.bottomSheet}>
          <Text style={styles.bottomSheetTitle}>{editingAddress ? 'Edit Location' : 'Select Location'}</Text>
          <Text style={styles.label}>Your Location</Text>
          <TextInput
            style={styles.locationInput}
            value={locationName}
            onChangeText={async (text) => {
              setLocationName(text);
              if (text.length > 2) { // Search after 2 characters
                try {
                  console.log('Geocoding search for:', text);
                  const geocodedLocations = await Location.geocodeAsync(text);
                  console.log('Full Geocoded Results:', JSON.stringify(geocodedLocations, null, 2));
                  setSearchResults(geocodedLocations);
                  if (geocodedLocations.length > 0) {
                    const { latitude, longitude } = geocodedLocations[0];
                    console.log('Geocoded result:', latitude, longitude);
                    if (webViewRef.current) {
                      webViewRef.current.postMessage(JSON.stringify({ type: 'setLocation', latitude: latitude, longitude: longitude }));
                    }
                  }
                } catch (error) {
                  console.error("Error geocoding location:", error);
                }
              } else {
                setSearchResults([]); // Clear results if input is too short
              }
            }}
            placeholder="Search for location or tap on map"
          />

          {searchResults.length > 0 && (
            <FlatList
              data={searchResults}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.searchResultItem}
                  onPress={() => {
                    setLocationName(formatAddress(item));
                    if (webViewRef.current) {
                      webViewRef.current.postMessage(JSON.stringify({ type: 'setLocation', latitude: item.latitude, longitude: item.longitude }));
                    }
                    setSearchResults([]); // Clear results after selection
                  }}
                >
                  <Text>{formatAddress(item)}</Text>
                </TouchableOpacity>
              )}
              style={styles.searchResultsList}
            />
          )}

          <Text style={styles.label}>Save As</Text>
          <View style={styles.saveAsContainer}>
            <TouchableOpacity
              style={[styles.saveAsButton, saveAs === 'Home' && styles.saveAsButtonSelected]}
              onPress={() => setSaveAs('Home')}
            >
              <View style={[styles.iconCircle, saveAs !== 'Home' && styles.iconCircleUnselected]}>
                <Ionicons name="home-outline" size={20} color={saveAs === 'Home' ? '#FF7D2E' : '#ff8c00'} />
              </View>
              <Text style={[styles.saveAsButtonText, saveAs === 'Home' && styles.saveAsButtonTextSelected]}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.saveAsButton, saveAs === 'Office' && styles.saveAsButtonSelected]}
              onPress={() => setSaveAs('Office')}
            >
              <View style={[styles.iconCircle, saveAs !== 'Office' && styles.iconCircleUnselected]}>
                <Ionicons name="business-outline" size={20} color={saveAs === 'Office' ? '#FF7D2E' : '#ff8c00'} />
              </View>
              <Text style={[styles.saveAsButtonText, saveAs === 'Office' && styles.saveAsButtonTextSelected]}>Office</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.saveAsContainer}>
            <TouchableOpacity
              style={[styles.saveAsButton, saveAs === 'Others' && styles.saveAsButtonSelected]}
              onPress={() => setSaveAs('Others')}
            >
              <View style={[styles.iconCircle, saveAs !== 'Others' && styles.iconCircleUnselected]}>
                <Ionicons name="location-outline" size={20} color={saveAs === 'Others' ? '#FF7D2E' : '#ff8c00'} />
              </View>
              <Text style={[styles.saveAsButtonText, saveAs === 'Others' && styles.saveAsButtonTextSelected]}>Others</Text>
            </TouchableOpacity>
          </View>

          {saveAs === 'Others' && (
            <TextInput
              style={styles.otherLocationInput}
              placeholder="Enter location name"
              value={otherLocationName}
              onChangeText={setOtherLocationName}
            />
          )}

          <TouchableOpacity style={styles.saveAddressButton} onPress={handleSaveAddress} disabled={isSaving}>
            {isSaving ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.saveAddressButtonText}>{editingAddress ? 'Update Address' : 'Save Address'}</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <Portal>
        <CustomAlert
          visible={alertVisible}
          title={alertTitle}
          message={alertMessage}
          onClose={() => {
            setAlertVisible(false);
            if (alertTitle === 'Address Saved' || alertTitle === 'Address Updated') {
              router.back();
            }
          }}
        />
      </Portal>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 80,
    left: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    zIndex: 10,
  },
  locateMeButton: {
    position: 'absolute',
    top: 80,
    right: 20,
    backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
  },
  locateMeButtonText: {
    color: '#fff',
    marginLeft: 5,
  },
  bottomSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 50,
  },
  bottomSheetTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    color: '#9D9D9D',
    marginBottom: 5,
    marginTop: 10,
  },
  locationInput: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    fontSize: 16,
  },
  saveAsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    gap: 10,
    flexWrap: 'wrap',
  },
  saveAsButton: {
    width: '48%', // Approximately 50% for two items per row with gap
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#F5F5F5',
  },
  saveAsButtonSelected: {
    backgroundColor: '#ff8c00',
    borderColor: '#ff8c00',
  },
  saveAsButtonText: {
    marginLeft: 5,
    color: '#000',
  },
  saveAsButtonTextSelected: {
    color: '#fff',
  },
  iconCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircleUnselected: {
    backgroundColor: '#fff',
  },
  otherLocationInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginTop: 10,
  },
  saveAddressButton: {
    backgroundColor: '#ff8c00',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  saveAddressButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  keyboardAvoidingContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  searchResultsList: {
    maxHeight: 200,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 5,
  },
  searchResultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});
