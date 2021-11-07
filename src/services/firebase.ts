import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getDatabase, ref, push, set, get, child } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const database = getDatabase(app);

const createTable = <T>(tableName: string, data: T) => {
  const listRef = ref(database, tableName);
  const newRef = push(listRef);

  set(newRef, data);

  return { key: newRef.key };
};

const getById = async (tableName: string, id: string) => {
  const snapshot = await get(child(ref(database), `${tableName}/${id}`));

  return snapshot;
};

export { auth, provider, signInWithPopup, createTable, getById };
