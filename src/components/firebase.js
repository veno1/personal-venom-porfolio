// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLZgMsGefew17V_EIB-1RrWjaeedAG3KA",
  authDomain: "myportfolio-483de.firebaseapp.com",
  projectId: "myportfolio-483de",
  storageBucket: "myportfolio-483de.firebasestorage.app",
  messagingSenderId: "231185593316",
  appId: "1:231185593316:web:8578e2914fefa412c68df1",
  measurementId: "G-76J2Q9K8XN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);