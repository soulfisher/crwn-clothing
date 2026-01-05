import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAptUOQWUVBejBrT1Un5uxs_3DrRlpjBfs",
  authDomain: "crwn-clothing-db-a0bc8.firebaseapp.com",
  projectId: "crwn-clothing-db-a0bc8",
  storageBucket: "crwn-clothing-db-a0bc8.firebasestorage.app",
  messagingSenderId: "353917652546",
  appId: "1:353917652546:web:b9e80a359c5a404c9427db",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }
  return userDocRef;
};
