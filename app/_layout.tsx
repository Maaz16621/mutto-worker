import { useColorScheme } from '@/hooks/useColorScheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { onAuthStateChanged, User } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { auth } from '../firebase';
import SplashScreenComponent from './SplashScreen';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter() as any;
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Roboto: require('../assets/fonts/static/Roboto-Regular.ttf'),
  });

  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setInitializing(false);
    });
    return unsubscribe;
  }, []);

  // ✅ Final condition: block navigation rendering until ready
  const isAppReady = loaded && !initializing;

  if (!isAppReady) {
    return <SplashScreenComponent/>; // Return null to keep splash screen visible
  }

  return (
    <PaperProvider>
      <SafeAreaProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" options={{ headerShown: false }} /> {/* Always go to index */}
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="language-select" options={{ headerShown: false }} />
            <Stack.Screen name="email-verification" options={{ headerShown: false }} />
            <Stack.Screen name="signin" options={{ headerShown: false }} />
            <Stack.Screen name="register" options={{ headerShown: false }} />
            <Stack.Screen name="change-password" options={{ headerShown: false }} />
            <Stack.Screen name="my-vehicles" options={{ headerShown: false }} />
            <Stack.Screen name="MyAddressesScreen" options={{ headerShown: false }} />
            <Stack.Screen name="AddAddressScreen" options={{ headerShown: false }} />
            <Stack.Screen name="EditAddressScreen" options={{ headerShown: false }} />
            <Stack.Screen name="SelectLocationScreen" options={{ headerShown: false }} />
            <Stack.Screen name="confirmation-screen" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="dark" translucent backgroundColor="transparent" />
        </ThemeProvider>
      </SafeAreaProvider>
    </PaperProvider>
  );
}