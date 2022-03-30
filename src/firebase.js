//firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAQib41vzMN8LRKNaOXy_nY8-TtdyIMNZM",
  authDomain: "sparta-react-basic-92075.firebaseapp.com",
  projectId: "sparta-react-basic-92075",
  storageBucket: "sparta-react-basic-92075.appspot.com",
  messagingSenderId: "967582516324",
  appId: "1:967582516324:web:43862fb2682db323118b71",
  measurementId: "G-186XZHN992"
};

initializeApp(firebaseConfig)

export const db = getFirestore();