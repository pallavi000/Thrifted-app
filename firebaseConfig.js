// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4SAwbzoRtxGWv_HnjR9Wk9Mu6Ts8PALg",
  authDomain: "thrifted-1be13.firebaseapp.com",
  projectId: "thrifted-1be13",
  storageBucket: "thrifted-1be13.appspot.com",
  messagingSenderId: "780145292602",
  appId: "1:780145292602:web:e7d6c8a39b1c4694988c03",
  measurementId: "G-GKKH6043LK",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);

export { firebaseAuth, firebaseApp };
