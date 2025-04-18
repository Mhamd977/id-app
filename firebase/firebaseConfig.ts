
import { initializeApp } from '@firebase/app';
import { getAuth, onAuthStateChanged, signOut, User } from '@firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCFMidDp5HQYM1Wj-xoIBIpnq6xSwvgOdA",
    authDomain: "digital-id-af592.firebaseapp.com",
    projectId: "digital-id-af592",
    storageBucket: "digital-id-af592.firebasestorage.app",
    messagingSenderId: "398825313124",
    appId: "1:398825313124:web:3b83ad7e1c0a59822f6071",
    measurementId: "G-EC0VB88Z5J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


export { app, auth }