import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  databaseURL: "https://pawfect-518c7-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDERID,
  appId: import.meta.env.APP_ID
};

const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
const db = getDatabase(app);

export {  db };
