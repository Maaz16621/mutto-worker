
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as SystemUI from 'expo-system-ui';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  BackHandler,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import CustomAlert from '../components/ui/CustomAlert';
import { auth } from '../firebase'; // Adjust the path as needed

interface SigninScreenProps {
  onRegister: () => void;
  onBack: () => void;
}

export default function SigninScreen({ onRegister, onBack }: SigninScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    SystemUI.setBackgroundColorAsync('#FF7D2E'); // Set navigation bar color

    const backAction = () => {
      onBack();
      return true; // Prevent default behavior (exit app)
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => {
      backHandler.remove();
      SystemUI.setBackgroundColorAsync('transparent'); // Reset navigation bar color on unmount
    };
  }, [onBack]);

  const showAlert = (title: string, message: string) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertVisible(true);
  };

  const handleSignIn = async () => {
    if (loading) return; // Prevent multiple clicks
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Navigate to home tab after successful sign-in
      router.replace('/(tabs)/');
    } catch (error: any) {
      showAlert('Authentication Error', error.message || 'An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      <Image
        source={require('../assets/images/mutto-01 2.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>SIGNIN</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#fff" />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            editable={!loading}
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#fff" />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            editable={!loading}
          />
        </View>
      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.7 }]}
        onPress={handleSignIn}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>SIGN IN</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={onRegister} disabled={loading}>
        <Text style={styles.registerText}>
          Don&apos;t have an account? <Text style={styles.registerLink}>Register</Text>
        </Text>
      </TouchableOpacity>
      <CustomAlert
        visible={alertVisible}
        title={alertTitle}
        message={alertMessage}
        onClose={() => setAlertVisible(false)}
      />
    </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF7D2E',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  logo: {
    width: 320,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    marginTop: 20,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 55,
    backgroundColor: 'rgba(19, 23, 28, 0.8)',
    borderRadius: 15,
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    paddingLeft: 10,
  },
  forgotPassword: {
    color: '#fff',
    alignSelf: 'flex-end',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#13171C', // Dark button, like on welcome screen
    paddingVertical: 18,
    borderRadius: 15,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerText: {
    marginTop: 30,
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  registerLink: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
