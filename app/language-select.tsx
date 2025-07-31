import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { default as React, useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const splashBg = require('../assets/images/splash-bg.png');

const languages = [
  { key: 'en', label: 'English', flag: '🇺🇸' },
  { key: 'ar', label: 'Arabic', flag: '🇸🇦' },
];

import { useRouter } from 'expo-router';

export default function LanguageSelectScreen() {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  useEffect(() => {
    AsyncStorage.getItem('selectedLanguage').then((lang: string | null) => {
      if (lang) {
        setSelectedLanguage(lang);
      }
    });
  }, []);

  const saveLanguage = async () => {
    if (!selectedLanguage) {
      Alert.alert('Please select a language to continue.');
      return;
    }
    await AsyncStorage.setItem('selectedLanguage', selectedLanguage);
    router.replace('/welcome');
  };

  const CheckMark = () => (
    <View style={styles.checkMarkContainer}>
      <Text style={styles.checkMark}>✓</Text>
    </View>
  );

  const renderItem = ({ item }: { item: { key: string; label: string; flag: string } }) => (
    <TouchableOpacity
      style={styles.languageOption}
      onPress={() => setSelectedLanguage(item.key)}
      activeOpacity={1}
    >
      <View style={styles.languageLabel}>
        <View style={styles.flagCircle}>
          <Text style={styles.flag}>{item.flag}</Text>
        </View>
        <Text style={styles.languageText}>{item.label}</Text>
      </View>
      <View style={[styles.radioCircle, selectedLanguage === item.key && styles.selectedRadioCircle]}>
        {selectedLanguage === item.key && <CheckMark />}
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={['#FF6A00', '#FF7D2E', '#FF9241']}
      end={{ x: 0.87, y: 0.0 }}
      start={{ x: 0.27, y: 1.0 }}
      style={styles.gradientBackground}
    >
      <Image source={splashBg} style={styles.backgroundImage} resizeMode="cover" />

      <View style={styles.container}>
        <Text style={styles.title}>Choose your Language</Text>
        <Text style={styles.subtitle}>
          Select your preferred language to use MUTTO Mobility Service
        </Text>

        <FlatList
          data={languages}
          renderItem={renderItem}
          keyExtractor={item => item.key}
          extraData={selectedLanguage}
          style={styles.languageList}
        />

        <TouchableOpacity style={styles.continueButton} onPress={saveLanguage}>
          <Text style={styles.continueButtonText}>Continue →</Text>
        </TouchableOpacity>
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
    paddingHorizontal: 40,
    paddingTop: 60,
    paddingBottom: 40,
    justifyContent: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  subtitle: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  languageList: {
    marginBottom: 20,
  },
  languageOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(19, 23, 28, 0.8)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  languageLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flag: {
    fontSize: 20,
  },
  flagCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  languageText: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Roboto',
  },
  radioCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRadioCircle: {
    backgroundColor: 'white',
    borderColor: 'white',
  },
  checkMarkContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 16,
    fontWeight: 'bold',
  },
  continueButton: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  footer: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
  },
});
