// import firebase from "firebase/app";
// import "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyD_9nx8CgsyOFyTFvML2BoOkusc6NK-JoQ",
//   authDomain: "keep-clone-ef1f1.firebaseapp.com",
//   projectId: "keep-clone-ef1f1",
//   storageBucket: "keep-clone-ef1f1.appspot.com",
//   messagingSenderId: "338838881968",
//   appId: "1:338838881968:web:84327807bcb5a05345dd75",
//   measurementId: "G-P12VFZK7VK",
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// export default firebase;

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD_9nx8CgsyOFyTFvML2BoOkusc6NK-JoQ",
  authDomain: "keep-clone-ef1f1.firebaseapp.com",
  projectId: "keep-clone-ef1f1",
  storageBucket: "keep-clone-ef1f1.appspot.com",
  messagingSenderId: "338838881968",
  appId: "1:338838881968:web:84327807bcb5a05345dd75",
  measurementId: "G-P12VFZK7VK",
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
