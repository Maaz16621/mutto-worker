import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../firebase';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AddVehicle from '../components/AddVehicle';
import CustomAlert from '../components/ui/CustomAlert';
import SlideUpView from '../components/SlideUpView';

interface Vehicle {
  id: string;
  name: string;
  plate: string;
  company: string;
  model: string;
  color: string;
  plateNumberPart1: string;
  plateNumberPart2: string;
  modelYear: string;
}

export default function MyVehiclesScreen() {
  const [isAddVehicleVisible, setIsAddVehicleVisible] = useState(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    const fetchVehicles = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const q = query(collection(db, 'vehicles'), where('userId', '==', user.uid));
          const querySnapshot = await getDocs(q);
          const fetchedVehicles: Vehicle[] = querySnapshot.docs.map(doc => ({
            id: doc.id,
            name: `${doc.data().company} ${doc.data().model}`,
            plate: `${doc.data().plateNumberPart1}-${doc.data().plateNumberPart2}`,
            company: doc.data().company,
            model: doc.data().model,
            color: doc.data().color,
            plateNumberPart1: doc.data().plateNumberPart1,
            plateNumberPart2: doc.data().plateNumberPart2,
            modelYear: doc.data().modelYear,
          }));
          setVehicles(fetchedVehicles);
        } catch (error) {
          console.error('Error fetching vehicles: ', error);
        }
      }
      setLoading(false);
    };

    fetchVehicles();
  }, [isAddVehicleVisible]);

  const renderItem = ({ item }: { item: Vehicle }) => (
    <View style={styles.vehicleContainer}>
      <View style={styles.vehicleIconContainer}>
        <Ionicons name="car-outline" size={30} color="#FF7D2E" />
      </View>
      <View style={styles.vehicleInfo}>
        <Text style={styles.vehicleName}>{item.name}</Text>
        <Text style={styles.vehiclePlate}>{item.plate}</Text>
      </View>
      <TouchableOpacity onPress={() => {
        setEditingVehicle(item);
        setIsAddVehicleVisible(true);
      }}>
        <Ionicons name="create-outline" size={24} color="#FF7D2E" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <SlideUpView
        isVisible={isAddVehicleVisible}
        onClose={() => {
          setIsAddVehicleVisible(false);
          setEditingVehicle(null);
        }}
        slideHeight={Dimensions.get('window').height * 0.9}
      >
        <AddVehicle
          onClose={() => {
            setIsAddVehicleVisible(false);
            setEditingVehicle(null);
          }}
          editingVehicle={editingVehicle}
          showAlert={(title, message) => {
            setAlertTitle(title);
            setAlertMessage(message);
            setAlertVisible(true);
          }}
        />
      </SlideUpView>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Vehicles</Text>
      </View>
      <FlatList
        data={vehicles}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={loading ? <Text style={styles.loadingText}>Loading vehicles...</Text> : <Text style={styles.loadingText}>No vehicles added yet.</Text>}
        ListFooterComponent={
          <Text style={styles.footerText}>
            You can manage multiple vehicles for easier booking
          </Text>
        }
      />
      <TouchableOpacity style={styles.addButton} onPress={() => setIsAddVehicleVisible(true)}>
        <Ionicons name="add-circle-outline" size={24} color="#fff" />
        <Text style={styles.addButtonText}>Add Another Vehicle</Text>
      </TouchableOpacity>
      <CustomAlert
        visible={alertVisible}
        title={alertTitle}
        message={alertMessage}
        onClose={() => setAlertVisible(false)}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  listContainer: {
    padding: 20,
  },
  vehicleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  vehicleIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FF7D2E1A', // Light orange background
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  vehicleInfo: {
    flex: 1,
  },
  vehicleName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  vehiclePlate: {
    fontSize: 14,
    color: 'gray',
  },
  footerText: {
    textAlign: 'center',
    color: 'gray',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#FF7D2E',
    padding: 15,
    borderRadius: 15,
    marginHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 60,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
});
