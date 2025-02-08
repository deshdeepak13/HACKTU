// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
import { getFirestore, collection, addDoc } from "firebase/firestore"; 
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0438n__djHXtP4IeHgqSoH7ShoB33ECE",
  authDomain: "cktu-56c2f.firebaseapp.com",
  projectId: "cktu-56c2f",
  storageBucket: "cktu-56c2f.firebasestorage.app",
  messagingSenderId: "804359966174",
  appId: "1:804359966174:web:6b307a72c35e31b9e5a14f",
  measurementId: "G-3474BSWBPZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db= getFirestore(app);
const analytics = getAnalytics(app);
export { db, addDoc, collection };