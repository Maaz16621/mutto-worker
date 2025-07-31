import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as SystemUI from 'expo-system-ui';
import { useEffect } from 'react';

interface EmailVerificationScreenProps {
  onSignIn: () => void;
  onResendEmail: () => void;
}

export default function EmailVerificationScreen({ onSignIn, onResendEmail }: EmailVerificationScreenProps) {
  useEffect(() => {
    SystemUI.setBackgroundColorAsync('#FF7D2E'); // Set navigation bar color

    return () => {
      SystemUI.setBackgroundColorAsync('transparent'); // Reset navigation bar color on unmount
    };
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Image
        source={require('../assets/images/mutto-01 2.png')}
        style={styles.logo}
      />
      <Ionicons name="mail-open-outline" size={100} color="#fff" style={styles.icon} />
      <Text style={styles.title}>Verify Your Email</Text>
      <Text style={styles.description}>
        We have sent a verification email to your address. Please check your inbox
        (and spam folder) and click the link to activate your account.
      </Text>
      <TouchableOpacity style={styles.button} onPress={onSignIn}>
        <Text style={styles.buttonText}>Go to Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onResendEmail}>
        <Text style={styles.resendText}>Resend Verification Email</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#FF7D2E',
  },
  logo: {
    width: 250,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#13171C',
    paddingVertical: 15,
    borderRadius: 15,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
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
  resendText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});