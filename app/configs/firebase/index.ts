// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeFirestore, CACHE_SIZE_UNLIMITED } from "@firebase/firestore";
import { getStorage, connectStorageEmulator } from "@firebase/storage";
import {
  connectFirestoreEmulator,
  enableIndexedDbPersistence,
} from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// import * as fireorm from "fireorm";
// fireorm.initialize(firestore);

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "fir-firebase-94fdd.firebaseapp.com",
  projectId: "fir-firebase-94fdd",
  storageBucket: "fir-firebase-94fdd.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const cloudStorage = getStorage(app);
// const db = getFirestore(app);
const db = initializeFirestore(app, {
  cacheSizeBytes: CACHE_SIZE_UNLIMITED,
  ignoreUndefinedProperties: true,
});
if (process.env.NODE_ENV !== "production") {
  connectStorageEmulator(cloudStorage, "localhost", 9199);
  connectFirestoreEmulator(db, "localhost", 8080);
}

enableIndexedDbPersistence(db);

export { cloudStorage, db };
/*
const fuego = new Fuego(firebaseConfig);
if (process.env.NODE_ENV !== "production") {
  connectStorageEmulator(fuego.storage, "localhost", 9199);
  connectFirestoreEmulator(fuego.db, "localhost", 8080);
}
enableIndexedDbPersistence(fuego.db);

export { fuego };
*/
