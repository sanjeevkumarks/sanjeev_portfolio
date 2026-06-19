import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyASyBM1mRJshrPQJPZLfLYsVJdjUHJ2pLo",
  authDomain: "sanjeev-portfolio24.firebaseapp.com",
  projectId: "sanjeev-portfolio24",
  storageBucket: "sanjeev-portfolio24.firebasestorage.app",
  messagingSenderId: "21067467157",
  appId: "1:21067467157:web:1eb4acc1920b04a7588e9c",
  measurementId: "G-R6TERFSMPM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
