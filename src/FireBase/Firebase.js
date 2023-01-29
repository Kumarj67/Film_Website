// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD21irQ5fGsbBwPp9y5JchcOUYMRKsPnbM",
  authDomain: "film-website-9bfa1.firebaseapp.com",
  projectId: "film-website-9bfa1",
  storageBucket: "film-website-9bfa1.appspot.com",
  messagingSenderId: "883029968483",
  appId: "1:883029968483:web:d61952c3527d5564729a56",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const MoviesRef = collection(db, "Movies");
export const reviewsRef = collection(db, "reviews");
export const usersRef = collection(db, "users");

export default app;
