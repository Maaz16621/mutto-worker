
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebase';
import * as SplashScreen from 'expo-splash-screen';

export default function IndexScreen() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setInitializing(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const checkNavigation = async () => {
      if (initializing) return; // Wait for Firebase auth to initialize

      const lang = await AsyncStorage.getItem('selectedLanguage');

      let initialRoute = '/';

      if (!user) {
        initialRoute = lang ? '/welcome' : '/language-select';
      } else {
        initialRoute = '/(tabs)'; // Assuming (tabs) is your authenticated route
      }

      router.replace(initialRoute);
      SplashScreen.hideAsync(); // Hide splash screen after navigation decision
    };

    checkNavigation();
  }, [initializing, user]);

  return null; // This screen doesn't render anything, it just handles navigation
}
