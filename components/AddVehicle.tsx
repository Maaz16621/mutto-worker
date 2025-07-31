import { Ionicons } from '@expo/vector-icons';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, BackHandler, FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth, db } from '../firebase';

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

interface AddVehicleProps {
  onClose: () => void;
  editingVehicle: Vehicle | null;
  showAlert: (title: string, message: string) => void;
}

const vehicleCompanies = [
  'Toyota',
  'Lexus',
  'Mercedes-Benz',
  'BMW',
  'Chevrolet',
  'Mitsubishi',
  'Bentley',
  'Range Rover / Land Rover',
  'Changan',
  'Honda',
  'Ford',
  'Audi',
  'Volkswagen',
  'Nissan',
  'Hyundai',
  'Kia',
  'Mazda',
  'Subaru',
  'Volvo',
  'Porsche',
  'Ferrari',
  'Lamborghini',
];

export default function AddVehicle({ onClose, editingVehicle, showAlert }: AddVehicleProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [searchModelQuery, setSearchModelQuery] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [plateNumberPart1, setPlateNumberPart1] = useState('');
  const [plateNumberPart2, setPlateNumberPart2] = useState('');
  const [modelYear, setModelYear] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (editingVehicle) {
      setSelectedCompany(editingVehicle.company);
      setSelectedModel(editingVehicle.model);
      setSelectedColor(editingVehicle.color);
      setPlateNumberPart1(editingVehicle.plateNumberPart1);
      setPlateNumberPart2(editingVehicle.plateNumberPart2);
      setModelYear(editingVehicle.modelYear);
    }
  }, [editingVehicle]);

  useEffect(() => {
    const onBackPress = () => {
      if (currentStep > 1) {
        setCurrentStep(currentStep - 1);
        return true; // Consume the event
      } else {
        onClose(); // Close the SlideUpView
        return true; // Consume the event
      }
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () => {
      if (BackHandler && BackHandler.removeEventListener) {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      }
    };
  }, [currentStep, onClose]);

  const filteredCompanies = vehicleCompanies.filter((company) =>
    company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getVehicleModels = (company: string) => {
    // This is a placeholder. In a real app, you'd fetch models based on the selected company.
    switch (company) {
      case 'Toyota':
        return ['Corolla', 'Land Cruiser', 'Prado', 'Fortuner', 'Hilux', 'Avalon', 'Rush', 'Raize', 'Innova', 'Supra'];
      case 'Nissan':
        return ['Altima', 'Patrol', 'Titan', 'Sentra', 'Kicks'];
      case 'Lexus':
        return ['RX', 'ES', 'NX', 'GX', 'LX'];
      default:
        return ['Model A', 'Model B', 'Model C'];
    }
  };

  const filteredModels = getVehicleModels(selectedCompany).filter((model) =>
    model.toLowerCase().includes(searchModelQuery.toLowerCase())
  );

  const StepHeader = ({ title, onBackPress }: { title: string; onBackPress: () => void }) => (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBackPress}>
        <Ionicons style={styles.backButton} name="chevron-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );

  const StepBar = ({ currentStep }: { currentStep: number }) => (
    <View style={styles.progressBarContainer}>
      {[1, 2, 3, 4].map((step) => (
        <View
          key={step}
          style={[
            styles.stepBarStep,
            currentStep >= step ? styles.stepBarStepActive : undefined,
          ]}
        />
      ))}
    </View>
  );

  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <StepHeader title="Select Vehicle Company" onBackPress={onClose} />
      <StepBar currentStep={currentStep} />
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="gray" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Vehicle Brand"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <FlatList
        data={filteredCompanies}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.companyItem}
            onPress={() => {
              setSelectedCompany(item);
              setCurrentStep(2);
            }}
          >
            <Text style={styles.companyText}>{item}</Text>
            {selectedCompany === item && (
              <View style={styles.checkmarkContainer}>
                <Ionicons name="checkmark" size={18} color="white" />
              </View>
            )}
          </TouchableOpacity>
        )}
        style={{ flex: 1 }} // Add flex: 1 to FlatList
      />
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <StepHeader title="Select Vehicle Model" onBackPress={() => setCurrentStep(1)} />
      <StepBar currentStep={currentStep} />
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="gray" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for your Vehicle"
          value={searchModelQuery}
          onChangeText={setSearchModelQuery}
        />
      </View>
      <FlatList
        data={filteredModels}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.companyItem}
            onPress={() => {
              setSelectedModel(item);
              setCurrentStep(3);
            }}
          >
            <Text style={styles.companyText}>{item}</Text>
            {selectedModel === item && (
              <View style={styles.checkmarkContainer}>
                <Ionicons name="checkmark" size={18} color="white" />
              </View>
            )}
          </TouchableOpacity>
        )}
        style={{ flex: 1 }}
      />
    </View>
  );

  const vehicleColors = [
    'Red', 'Blue', 'Green', 'Black', 'White', 'Silver', 'Gray', 'Yellow', 'Orange', 'Purple',
  ];


  const renderStep3 = () => (
    <View style={styles.stepContainer}>
      <StepHeader title="Select Vehicle Color" onBackPress={() => setCurrentStep(2)} />
      <StepBar currentStep={currentStep} />
      <FlatList
        data={vehicleColors}
        keyExtractor={(item) => item}
        numColumns={4} // Display colors in 4 columns
        contentContainerStyle={styles.colorSelectionContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.colorOption,
              { backgroundColor: item.toLowerCase() }, // Set background color dynamically
              selectedColor === item && styles.selectedColorOption,
            ]}
            onPress={() => {
              setSelectedColor(item);
              setCurrentStep(4);
            }}
          >
            {selectedColor === item && (
              <Ionicons name="checkmark-circle" size={24} color={selectedColor === 'White' ? 'black' : 'white'} />
            )}
          </TouchableOpacity>
        )}
        style={{ flex: 1 }}
      />
    </View>
  );

  const renderStep4 = () => (
    <KeyboardAvoidingView
      style={styles.stepContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 80}
    >
      <StepHeader title="Vehicle Details" onBackPress={() => setCurrentStep(3)} />
      <StepBar currentStep={currentStep} />
      <View style={styles.detailsContainer}>
        <View style={styles.vehicleCardContainer}>
          <View style={styles.vehicleIconContainer}>
            <Ionicons name="car-outline" size={30} color={selectedColor.toLowerCase()} />
          </View>
          <View style={styles.vehicleInfo}>
            <Text style={styles.vehicleName}>{selectedCompany} {selectedModel}</Text>
       
          </View>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.detailLabel}>Plate Number</Text>
          <View style={styles.plateNumberInputContainer}>
            <TextInput
              style={[styles.plateNumberPartInput, styles.plateNumberPart1]}
              placeholder="Part 1"
              value={plateNumberPart1}
              onChangeText={setPlateNumberPart1}
              maxLength={3} // Assuming max 3 characters for first part
            />
            <TextInput
              style={[styles.plateNumberPartInput, styles.plateNumberPart2]}
              placeholder="Part 2"
              value={plateNumberPart2}
              onChangeText={setPlateNumberPart2}
              maxLength={4} // Assuming max 4 characters for second part
            />
          </View>
          <Text style={styles.detailLabel}>Model Year</Text>
          <TextInput
            style={styles.detailInput}
            placeholder="Enter Model Year"
            value={modelYear}
            onChangeText={setModelYear}
            keyboardType="numeric"
            maxLength={4}
          />
        </View>
        <TouchableOpacity style={styles.confirmButton} onPress={async () => {
          const user = auth.currentUser;
          if (!user) {
            showAlert('Authentication Error', 'You must be logged in to add or update a vehicle.');
            return;
          }

          setIsLoading(true);

          const vehicleData = {
            userId: user.uid,
            company: selectedCompany,
            model: selectedModel,
            color: selectedColor,
            plateNumberPart1: plateNumberPart1,
            plateNumberPart2: plateNumberPart2,
            modelYear: modelYear,
          };

          try {
            if (editingVehicle) {
              const vehicleRef = doc(db, 'vehicles', editingVehicle.id);
              await updateDoc(vehicleRef, vehicleData);
              showAlert('Success', 'Vehicle updated successfully!');
            } else {
              await addDoc(collection(db, 'vehicles'), {
                ...vehicleData,
                createdAt: new Date(),
              });
              showAlert('Success', 'Vehicle added successfully!');
            }
            onClose();
          } catch (error) {
            console.error('Error saving vehicle: ', error);
            showAlert('Error', 'Failed to save vehicle. Please try again.');
          } finally {
            setIsLoading(false);
          }
        }}>
          {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.confirmButtonText}>{editingVehicle ? 'Update Vehicle' : 'Confirm'}</Text>}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      default:
        return renderStep1();
    }
  };

  return (
    <View style={styles.container}>
      {renderCurrentStep()}
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  stepContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
   
    marginTop: 20,
    marginBottom: 24,
    position: 'relative',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',  
  },
  backButton: {
    position: 'absolute',
    top: -10,
    left: 16,

  },
  progressBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 22,
  },
  stepBarStep: {
    flex: 1,
    height: 8,
    marginHorizontal: 6,
    borderRadius: 12,
    backgroundColor: '#FF7D2E1A', // inactive color with transparency
  },
  stepBarStepActive: {
    backgroundColor: '#FF7D2E', // active color
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF7D2E08',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  companyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingHorizontal: 22,
  },
  companyText: {
    fontSize: 16,
  },
  checkmarkContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FF7D2E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorSelectionContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#FF7D2E1A',
    marginHorizontal: 20,
    borderRadius: 16,
        justifyContent: 'center',
        
  },
  colorOption: {
    width: 60,
    height: 60,
    borderRadius: 15,
    margin: 10,

    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedColorOption: {
    borderColor: '#FF7D2E',
  },
  detailsContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  detailInput: {
    borderRadius: 10,
    padding: 16,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#FF7D2E08',
  },
  confirmButton: {
    backgroundColor: '#FF7D2E',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
    color: '#333',
  },
  summaryValue: {
    fontSize: 16,
    color: '#555',
  },
  summaryColorBox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  formContainer: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  vehicleSummaryContainer: {
    backgroundColor: '#FF7D2E08',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  detailsScrollView: {
    flex: 1,
  },
  vehicleCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF7D2E08',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    
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
  plateNumberInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: '#FF7D2E08',
    overflow: 'hidden', // Ensures children respect border radius
  },
  plateNumberPartInput: {
    padding: 16,
    fontSize: 16,
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  plateNumberPart1: {
    flex: 0.2, // 20% width
    borderRightWidth: 1,
    borderRightColor: '#000',
  },
  plateNumberPart2: {
    flex: 0.8, // 80% width
  },
});

