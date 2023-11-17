// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6gf_Z4ZtHgxwOEj73U0QJWXAM4bmkwB4",
  authDomain: "crossplatform-902a6.firebaseapp.com",
  projectId: "crossplatform-902a6",
  storageBucket: "crossplatform-902a6.appspot.com",
  messagingSenderId: "163488058591",
  appId: "1:163488058591:web:325d28c17a711225696d6a",
  measurementId: "G-Z20BRJSL9B"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp)
export const db = getFirestore(firebaseApp)