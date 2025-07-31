import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCQjWrgJem-afR7FdT9jrDkP4ZiuqVHWY",
  authDomain: "mutto-84d97.firebaseapp.com",
  databaseURL: "https://mutto-84d97-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mutto-84d97",
  storageBucket: "mutto-84d97.firebasestorage.app",
  messagingSenderId: "816589390469",
  appId: "1:816589390469:web:f7ef72c0aa7566d5621fec",
  measurementId: "G-269XN9XQW5"
};

// Initialize Firebase
let app;
let auth;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
} else {
  app = getApp();
  auth = getAuth(app);
}
const db = getFirestore(app);

export { auth, db, firebaseConfig };