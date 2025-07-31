import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import RegisterScreen from '../RegisterScreen';
import SigninScreen from '../SigninScreen';
const { width, height } = Dimensions.get('window');

interface WelcomeScreenProps {
  onRegister: () => void;
  onSignin: () => void;
  onContinue: () => Promise<void>;
  onEmailVerificationSent: () => void;
}

export default function WelcomeScreen({onContinue, onRegister, onSignin: onSigninProp, onEmailVerificationSent }: WelcomeScreenProps) {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current; // Initial opacity 1
  const images = [
    require('../../assets/images/welcome-1.png'),
    require('../../assets/images/welcome-2.png'),
  ];
  const titles = [
    "Ready to start\nyour service?",
       "Ready to start\nyour service?",
  ];

  const descriptions = [
    "Easily view your assigned jobs, track your progress, and start your workday right.",
    "Get professional repair services delivered to your location, hassle-free.",
  ];

  const handleSwipe = (direction: 'left' | 'right') => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setCurrentImageIndex((prevIndex) => {
        let newIndex = prevIndex;
        if (direction === 'right') {
          newIndex = (prevIndex + 1) % images.length;
        } else if (direction === 'left') {
          newIndex = (prevIndex - 1 + images.length) % images.length;
        }
        return newIndex;
      });
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 50) {
          handleSwipe('left');
        } else if (gestureState.dx < -50) {
          handleSwipe('right');
        }
      },
    })
  ).current;

  const handleSigninClick = () => {
    setCurrentScreen('signin');
  };

  const handleRegisterClick = () => {
    setCurrentScreen('register');
  };

  if (currentScreen === 'signin') {
    return <SigninScreen onBack={() => setCurrentScreen('welcome')} onRegister={handleRegisterClick} />;
  }

  if (currentScreen === 'register') {
    return <RegisterScreen onBack={() => setCurrentScreen('welcome')} onSignIn={handleSigninClick} onEmailVerificationSent={onEmailVerificationSent} />;
  }

  return (
<LinearGradient
  colors={['#FF6A00', '#FF7D2E', '#FF9241']}
  end={{ x: 0.87, y: 0.0 }}
  start={{ x: 0.27, y: 1.0 }}
  style={styles.container}
>

      <View style={styles.topContent}>
        <Text style={styles.title}>{titles[currentImageIndex]}</Text>
      </View>

      <View style={styles.imageWrapper} {...panResponder.panHandlers}>
   

        <Animated.Image
          source={images[currentImageIndex]}
          style={[styles.overlayImage, { opacity: fadeAnim }]}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.description}>
        {descriptions[currentImageIndex]}
      </Text>

      <View style={styles.pagination}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: index === currentImageIndex ? '#000' : '#fff' },
            ]}
          />
        ))}
      </View>

      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.registerButton} onPress={handleRegisterClick}>
          <Text style={styles.registerText}>REGISTER</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signinButton} onPress={handleSigninClick}>
          <Text style={styles.signinText}>SIGNIN</Text>
        </TouchableOpacity>
      </View>
  </LinearGradient>

  );
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  paddingTop: 50,
  paddingBottom: 30,
  width: width,
  height: height,
},
  topContent: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  imageWrapper: {
    width: '100%',
    height: height * 0.4,
    alignItems: 'flex-end',
    marginBottom: 20,
    position: 'relative',
  },
  imageBgContainer: {
    position: 'absolute',
    right: 0,
    height: '100%',
      width: width > 600 ? "50%" : "100%" ,
    alignItems: 'flex-end',
    zIndex: 0,
  },
  bgImage: {
    height: '105%',
    width: "100%" ,
    right: "-30%",
    alignSelf: 'flex-end',
  },
  overlayImage: {
    width: width * 0.8,
    height: '100%',
    zIndex: 1,
  },
  description: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
    minHeight: 60, // Ensure enough space for descriptions
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  dot: {
    width: 40,
    height: 8,
    backgroundColor: 'rgba(19, 23, 28, 0.9)',
    borderRadius: 12,
    marginHorizontal: 5,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    width: '100%',
    marginTop: 'auto',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  registerButton: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 20, // Adjusted padding
    borderRadius: 13,
    flex: 1, // Use flex to distribute space
    minWidth: 120, // Minimum width to prevent wrapping
    alignItems: 'center', // Center text horizontally
  },
  registerText: {
    color: '#FF7D2E',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  signinButton: {
    backgroundColor: '#13171C',
    paddingVertical: 14,
    paddingHorizontal: 20, // Adjusted padding
    borderRadius: 13,
    flex: 1, // Use flex to distribute space
    minWidth: 120, // Minimum width to prevent wrapping
    alignItems: 'center', // Center text horizontally
  },
  signinText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
      textAlign: 'center',
  },
});