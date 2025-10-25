// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBetD3QL8a0UKsRrXBFdmp_IqnBRMwKGZM",
  authDomain: "birzumda1.firebaseapp.com",
  projectId: "birzumda1",
  storageBucket: "birzumda1.firebasestorage.app",
  messagingSenderId: "663713746971",
  appId: "1:663713746971:web:619043a806c384763ea8be",
  measurementId: "G-KTPT847CE2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);