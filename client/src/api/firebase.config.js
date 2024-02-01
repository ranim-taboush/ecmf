// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from '@firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBPOUBXMGXpYuDcp_Fq2ipHOcIzsGtQfmY",
    authDomain: "ecmf-blogs.firebaseapp.com",
    projectId: "ecmf-blogs",
    storageBucket: "ecmf-blogs.appspot.com",
    messagingSenderId: "218725792958",
    appId: "1:218725792958:web:87374ad27a50fb280532ef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)