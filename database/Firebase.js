import firebase from "firebase/app";

import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC5ZYkDKKgffA96mZb0w4rraUM355RMJEg",
    authDomain: "citasapp-8aad2.firebaseapp.com",
    projectId: "citasapp-8aad2",
    storageBucket: "citasapp-8aad2.appspot.com",
    messagingSenderId: "395285372670",
    appId: "1:395285372670:web:167e66be8ac5547f6e4faf",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default {
    firebase,
    db,
};
