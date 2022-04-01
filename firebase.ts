import * as firebaseui from 'firebaseui';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOcNEO_KdnXoo7-hokEX7ViJaXhEvqhuQ",
  authDomain: "fir-practice-93fcc.firebaseapp.com",
  databaseURL: "https://fir-practice-93fcc-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fir-practice-93fcc",
  storageBucket: "fir-practice-93fcc.appspot.com",
  messagingSenderId: "1070720601282",
  appId: "1:1070720601282:web:cace2829432bad5d4c7f5b",
  measurementId: "G-SP5370WYM4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
