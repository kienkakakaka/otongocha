// Import the functions you need from the SDKs you need
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCo9PAfQV-UkdkfY5_2ILmR9doDBx9SQyk",
  authDomain: "cham-cong-a924c.firebaseapp.com",
  databaseURL:
    "https://cham-cong-a924c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "cham-cong-a924c",
  storageBucket: "cham-cong-a924c.appspot.com",
  messagingSenderId: "451634119273",
  appId: "1:451634119273:web:ab8d58f2bd545c8e7558f8",
  measurementId: "G-ETVR7ZBMFN",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage();
export const auth = getAuth(app);
export const db = getDatabase(app);
