import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDXnxxy6xSJmMJaho3no_ga4C5z5ws1n-Y",
  authDomain: "chatapp-b7a1e.firebaseapp.com",
  projectId: "chatapp-b7a1e",
  storageBucket: "chatapp-b7a1e.appspot.com",
  messagingSenderId: "212311580797",
  appId: "1:212311580797:web:8f7b068e774a697f2cd114"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);


export default app;
