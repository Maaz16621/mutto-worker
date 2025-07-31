
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { collection, deleteDoc, doc, onSnapshot, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Portal } from 'react-native-paper';
import CustomAlert from '../components/ui/CustomAlert';
import { auth, db } from '../firebase';

export default function MyAddressesScreen() {
  const router = useRouter();
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) {
      setAlertTitle('Error');
      setAlertMessage('User not logged in.');
      setAlertVisible(true);
      setIsLoading(false);
      return;
    }

    const q = query(collection(db, 'users', user.uid, 'addresses'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedAddresses: any = [];
      querySnapshot.forEach((document) => {
        fetchedAddresses.push({ id: document.id, ...document.data() });
      });
      setAddresses(fetchedAddresses);
      if (fetchedAddresses.length > 0) {
        setSelectedAddress(fetchedAddresses[0].id); // Select the first address by default
      }
      setIsLoading(false);
    }, (error) => {
        console.error("Error fetching addresses: ", error);
        setAlertTitle('Error');
        setAlertMessage('Failed to fetch addresses.');
        setAlertVisible(true);
        setIsLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const handleDeleteAddress = async (id: string) => {
    if (!user) {
      setAlertTitle('Error');
      setAlertMessage('User not logged in.');
      setAlertVisible(true);
      return;
    }
    try {
      await deleteDoc(doc(db, 'users', user.uid, 'addresses', id));
      setAlertTitle('Success');
      setAlertMessage('Address deleted successfully.');
      setAlertVisible(true);
    } catch (error) {
      console.error('Error deleting address:', error);
      setAlertTitle('Error');
      setAlertMessage('Failed to delete address.');
      setAlertVisible(true);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ff8c00" />
        </View>
      );
    }

    if (addresses.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No addresses found. Please add a new address.</Text>
        </View>
      );
    }

    return addresses.map((address) => (
      <View key={address.id} style={styles.addressContainer}>
        <View style={styles.cardHeader}>
          <View style={styles.cardHeaderLeft}>
            <Ionicons name={address.icon || 'location-outline'} size={24} color="#000" />
            <Text style={styles.addressType}>{address.type}</Text>
          </View>
          <TouchableOpacity style={styles.editButton} onPress={() => router.push({ pathname: '/SelectLocationScreen', params: { address: JSON.stringify(address) } })}>
            <Ionicons name="pencil-outline" size={20} color="#000" />
          </TouchableOpacity>
        </View>
        <View style={styles.cardBody}>
          <Text style={styles.addressDetails}>{address.address}</Text>
        </View>
        <View style={styles.cardFooter}>
          <TouchableOpacity onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${address.address}`)}>
            <Text style={styles.viewOnMap}>View on map</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteAddress(address.id)}>
            <Ionicons name="trash-outline" size={20} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
     <View style={styles.header}>
           <TouchableOpacity onPress={() => router.replace('/(tabs)/edit-profile')}>
             <Ionicons name="chevron-back" size={24} color="black" />
           </TouchableOpacity>
           <Text style={styles.headerTitle}>Addresses</Text>
             <TouchableOpacity onPress={() => router.push('/SelectLocationScreen')} style={styles.addButton}>
          <Ionicons name="add-circle-outline" size={28} color="#000" />
        </TouchableOpacity>
         </View>
      <ScrollView style={styles.scrollView}>
        {renderContent()}
      </ScrollView>

      <Portal>
        <CustomAlert
          visible={alertVisible}
          title={alertTitle}
          message={alertMessage}
          onClose={() => setAlertVisible(false)}
        />
      </Portal>
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 50, // Adjust for status bar
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    width: '100%',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  addButton: {
    alignSelf: 'flex-end',
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  addressContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 25,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, // Allow it to take available space
  },
  addressType: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  cardBody: {
    paddingLeft: 34, // Align with addressType text
    marginBottom: 10,
  },
  addressDetails: {
    fontSize: 16,
    color: '#666',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 34, // Align with addressType text
  },
  editButton: {
    padding: 5,
  },
  deleteButton: {
    padding: 5,
  },
  viewOnMap: {
    color: '#ff8c00',
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
});
