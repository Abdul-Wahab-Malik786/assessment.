import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA1oLuIrq6R-TCTZeMU0ij6CBX6k2YJQ6s",
  authDomain: "newapp-task.firebaseapp.com",
  projectId: "newapp-task",
  storageBucket: "newapp-task.firebasestorage.app",
  messagingSenderId: "150491700433",
  appId: "1:150491700433:android:4c0bfc25babede02a9b9f0",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
