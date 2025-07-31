import { LinearGradient } from 'expo-linear-gradient';
import * as NavigationBar from 'expo-navigation-bar';
import React, { useEffect } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';

const splashBg = require('../assets/images/splash-bg.png');
const muttoLogo = require('../assets/images/mutto-01 2.png');

export default function SplashScreen() {
useEffect(() => {
  (async () => {
    // Set the navigation bar to transparent
    await NavigationBar.setBackgroundColorAsync('#00000000'); // Transparent using 8-digit hex
    await NavigationBar.setButtonStyleAsync('light'); // Light icons for dark background (adjust as needed)
    await NavigationBar.setVisibilityAsync('visible'); // Ensure it's not hidden
    await NavigationBar.setBehaviorAsync('inset-swipe'); // To overlay content under nav bar
  })();
}, []);


  return (
    <LinearGradient
      colors={['#FF6A00', '#FF7D2E', '#FF9241']}
      end={{ x: 0.87, y: 0.0 }}
      start={{ x: 0.27, y: 1.0 }}
      style={styles.gradientBackground}
    >
      
      <Image source={splashBg} style={styles.backgroundImage} resizeMode="cover" />
      <View style={styles.contentContainer}>
        <Image source={muttoLogo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.footer}>Made By Flow Cubbo</Text>
      </View>
    </LinearGradient>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 40,
    zIndex: 1,
  },
  logo: {
    width: 200,
    height: 80,
    marginTop: height / 3,
  },
  footer: {
    fontSize: 12,
    color: '#fff',
    fontFamily: 'SpaceMono',
  },
});
