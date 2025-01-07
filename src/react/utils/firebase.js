// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getDatabase } from 'firebase/database'
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDR4NjwFeXbhd-DRH4zKq3mR_4g6aCUMy0",
  authDomain: "bcpolympiad.firebaseapp.com",
  databaseURL: "https://bcpolympiad-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "bcpolympiad",
  storageBucket: "bcpolympiad.firebasestorage.app",
  messagingSenderId: "576040883902",
  appId: "1:576040883902:web:26d6366493357ed53c70ef",
  measurementId: "G-H6M4F4J5TY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);