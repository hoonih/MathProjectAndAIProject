// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBTzsoIRuz2gNh7klV63_76s2TbGDTB7kE",
    authDomain: "aiproject-36d03.firebaseapp.com",
    projectId: "aiproject-36d03",
    storageBucket: "aiproject-36d03.firebasestorage.app",
    messagingSenderId: "466874394299",
    appId: "1:466874394299:web:e5c4edeaabc39ff5aeab9e",
    measurementId: "G-N03KX36YPD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
