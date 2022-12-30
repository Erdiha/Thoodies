// Import the functions you need from the SDKs you need
import { getApp, initializeApp, getApps } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCdn7DvMjQhRXIiwR5aUId8m7i8LobSiVg',
  authDomain: 'thoodies.firebaseapp.com',
  projectId: 'thoodies',
  storageBucket: 'thoodies.appspot.com',
  messagingSenderId: '879840501103',
  appId: '1:879840501103:web:44f5237058628598675c9a',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
// const analytics = getAnalytics(app);
const auth = getAuth();

export default app;
export { auth, db };
