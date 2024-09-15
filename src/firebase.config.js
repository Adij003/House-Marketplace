// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnML_OtP92pVioy46a07MS_dfzSUfQXxg",
  authDomain: "house-marketplace-app-e30e7.firebaseapp.com",
  projectId: "house-marketplace-app-e30e7",
  storageBucket: "house-marketplace-app-e30e7.appspot.com",
  messagingSenderId: "641664674935",
  appId: "1:641664674935:web:a49c9201bc0fa0f9ecea72"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()
