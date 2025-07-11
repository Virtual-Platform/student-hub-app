// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPmkdpDGyttWaO8EqGbnvR5y-sUIOhm0g",
  authDomain: "student-hub-app-93030.firebaseapp.com",
  projectId: "student-hub-app-93030",
  storageBucket: "student-hub-app-93030.firebasestorage.app",
  messagingSenderId: "100874943921",
  appId: "1:100874943921:web:f247e433f11b6d575a1190",
  measurementId: "G-FYXDRD7QNY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);