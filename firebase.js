// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAe07bIIl1tm40cfk8KuWUDm1og0UUxhEg",
  authDomain: "kanban-afdf7.firebaseapp.com",
  projectId: "kanban-afdf7",
  storageBucket: "kanban-afdf7.firebasestorage.app",
  messagingSenderId: "315355408600",
  appId: "1:315355408600:web:b5145c752557a18d610fad",
  measurementId: "G-0FM81D7MGK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);