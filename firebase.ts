import { getApp, getApps, initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"


const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "dropbox-clone-2-875b9.firebaseapp.com",
  projectId: "dropbox-clone-2-875b9",
  storageBucket: "dropbox-clone-2-875b9.appspot.com",
  messagingSenderId: "190138377195",
  appId: "1:190138377195:web:d1076ff02ab2dc79cb2fae"
};



const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };
