
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAs7ASEa9eR9CH0SvVhiiHdCAMp9-ImRDY",
    authDomain: "jsi13---lesson03.firebaseapp.com",
    projectId: "jsi13---lesson03",
    storageBucket: "jsi13---lesson03.firebasestorage.app",
    messagingSenderId: "802544290240",
    appId: "1:802544290240:web:3f6d5200e112214deaa025",
    measurementId: "G-3CV2EV38EY"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);