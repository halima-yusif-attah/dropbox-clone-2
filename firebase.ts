import { getApp, getApps, initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"


const firebaseConfig = {
  apiKey: "FIREBASE_API_KEY",
  authDomain: "dropbox-clone-c71e7.firebaseapp.com",
  projectId: "dropbox-clone-c71e7",
  storageBucket: "dropbox-clone-c71e7.appspot.com",
  messagingSenderId: "876596289081",
  appId: "1:876596289081:web:b390a4454c935475c4f7e8"
};


const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };
