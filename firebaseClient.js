import firebase from "firebase";
const FIREBASE_CONFIG = {
apiKey: "AIzaSyAYY0IB60PYJwTcRL1vxK-sXifW3CO-XO4",
    authDomain: "store-9fa0c.firebaseapp.com",
    databaseURL: "https://store-9fa0c-default-rtdb.firebaseio.com/",
    projectId: "store-9fa0c",
    storageBucket: "store-9fa0c.appspot.com",
    messagingSenderId: "576936738036",
    appId: "1:576936738036:web:55b6db6f912d15f04a32a1",
    measurementId: "G-VS8KWKW32X"
  };

  export default function firebaseClient(){
    if (!firebase.apps.length){
      firebase.initializeApp(FIREBASE_CONFIG);
    }
  }