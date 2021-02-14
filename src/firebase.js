import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDTQQOt4FXxChzZBB7uaK02EDIl2M5bgzI",
    authDomain: "fancy-todo-38543.firebaseapp.com",
    databaseURL: "https://fancy-todo-38543.firebaseio.com",
    projectId: "fancy-todo-38543",
    storageBucket: "fancy-todo-38543.appspot.com",
    messagingSenderId: "933278068562",
    appId: "1:933278068562:web:eb315f427fc78e1e95d48b"
  };

firebase.initializeApp(firebaseConfig)
export const provider = new firebase.auth.GoogleAuthProvider();  
export const authh = firebase.auth()
  export const database = firebase.database()
  