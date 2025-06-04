// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDjlcs5X41KY6fkRCAapHud9B06qT0HRlg",
  authDomain: "roc-list.firebaseapp.com",
  projectId: "roc-list",
  storageBucket: "roc-list.firebasestorage.app",
  messagingSenderId: "596773270591",
  appId: "1:596773270591:web:236a3e243270390f7fb48a",
  measurementId: "G-GNMQLVJY49"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
const db = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, db, storage };
