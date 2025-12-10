// 🔹 Import Firebase core and services
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  RecaptchaVerifier,
  signInWithPopup,
  signInWithPhoneNumber,
  signOut,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  addDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

// 🔹 Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAO5Jxn6_jCbDxCtD2hyUtQK0qWCTVJGMU",
  authDomain: "carrerpath-7ca2e.firebaseapp.com",
  projectId: "carrerpath-7ca2e",
  storageBucket: "carrerpath-7ca2e.appspot.com",
  messagingSenderId: "549910884669",
  appId: "1:549910884669:web:c894751454a9ef3a3d5554",
  measurementId: "G-3631J68JMP"
};

// 🔹 Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// 🔹 Auth Providers
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

// 🔹 reCAPTCHA (for Phone Auth)
const generateRecaptcha = () => {
  window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
    size: "invisible",
    callback: (response) => {
      console.log("Recaptcha verified");
    },
    "expired-callback": () => {
      alert("Recaptcha expired. Please try again.");
    },
  });
};

// 🔹 Function to handle new or returning users
const handleUserLogin = async (user) => {
  const userRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(userRef);

  if (docSnap.exists()) {
    // User exists – update login count & last login
    await updateDoc(userRef, {
      loginCount: (docSnap.data().loginCount || 0) + 1,
      lastLogin: serverTimestamp(),
    });
  } else {
    // New user – create profile
    await setDoc(userRef, {
      uid: user.uid,
      name: user.displayName || "Anonymous",
      email: user.email,
      photoURL: user.photoURL || "",
      loginCount: 1,
      lastLogin: serverTimestamp(),
      createdAt: serverTimestamp(),
    });
  }
};

// 🔹 Function to save a chat session
const saveChat = async (uid, message, response) => {
  const chatsRef = collection(db, "users", uid, "chats");
  await addDoc(chatsRef, {
    message,
    response,
    createdAt: serverTimestamp(),
  });
};

// 🔹 Export everything
export {
  // App
  app,
  // Auth
  auth,
  googleProvider,
  githubProvider,
  signInWithPopup,
  signInWithPhoneNumber,
  signOut,
  RecaptchaVerifier,
  generateRecaptcha,
  // DB
  db,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  addDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  getDocs,
  serverTimestamp,
  // Storage
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  // Custom
  handleUserLogin,
  saveChat,
};
