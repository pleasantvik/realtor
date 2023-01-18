// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import {getFireStore}
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9ZA95MJv-58e_v7WXP42WUUrukMtvW7M",
  authDomain: "nexter-real-estate.firebaseapp.com",
  projectId: "nexter-real-estate",
  storageBucket: "nexter-real-estate.appspot.com",
  messagingSenderId: "894354516299",
  appId: "1:894354516299:web:65a5bad575cdc929b9e0ce",
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
