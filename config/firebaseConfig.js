// Import the functions you need from the SDKs you need
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpvECWM3yoRg9jyk2P8ZhLJhuUgiJ5huQ",
  authDomain: "playground-acea3.firebaseapp.com",
  projectId: "playground-acea3",
  storageBucket: "playground-acea3.firebasestorage.app",
  messagingSenderId: "1043191275241",
  appId: "1:1043191275241:web:200679d70849b5ab431a78",
  measurementId: "G-Z03FXQ3HDN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const db = getFirestore(app);
export const analytics = getAnalytics(app);