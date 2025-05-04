// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // ✅ import getAuth

const firebaseConfig = {
  apiKey: "Google API key",
  authDomain: "accident2025-14308.firebaseapp.com",
  projectId: "accident2025-14308",
  storageBucket: "accident2025-14308.appspot.com",
  messagingSenderId: "49073170819",
  appId: "1:49073170819:web:a46be444cd124119ff2eb6",
  measurementId: "G-B1B77TTL68"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
// ✅ Add this line to initialize auth
export const auth = getAuth(app);
export { db };

