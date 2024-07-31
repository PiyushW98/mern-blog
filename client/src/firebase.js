// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-blog-9a51a.firebaseapp.com",
    projectId: "mern-blog-9a51a",
    storageBucket: "mern-blog-9a51a.appspot.com",
    messagingSenderId: "104491461439",
    appId: "1:104491461439:web:dad256582689138441018a",
    measurementId: "G-9FWX9DDZLJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);