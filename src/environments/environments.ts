// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const firebaseConfig = {
  apiKey: "AIzaSyAjQxVwytQCGHThNZX1kaXP5rH4UFY0J2E",
  authDomain: "mindboard-cdd8c.firebaseapp.com",
  databaseURL: "https://mindboard-cdd8c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mindboard-cdd8c",
  storageBucket: "mindboard-cdd8c.appspot.com",
  messagingSenderId: "102551647619",
  appId: "1:102551647619:web:500a70a5f88bcbd958b2b6",
  measurementId: "G-CYV96DSYYM"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
