import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import 'firebase/database';

const firebaseConfig = {
    apiKey: "key",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };

firebase.initializeApp(firebaseConfig)
export const provider = new firebase.auth.GoogleAuthProvider();  
export const authh = firebase.auth()
  export const database = firebase.database()
  
