import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDx3O1TCUeGn4sd2J5w2S0L4M-Jd3bosV4",
  authDomain: "time-management-app-ca473.firebaseapp.com",
  projectId: "time-management-app-ca473",
  storageBucket: "time-management-app-ca473.appspot.com",
  messagingSenderId: "885175198818",
  appId: "1:885175198818:web:7aa7645762c39bcc879d3b"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();

export { db }