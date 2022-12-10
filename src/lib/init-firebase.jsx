import { getFirestore } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA0VFaMfCHpvt1XoeyivuBuzWnaSLgzdho',
  authDomain: 'invitacion18-941ac.firebaseapp.com',
  projectId: 'invitacion18-941ac',
  storageBucket: 'invitacion18-941ac.appspot.com',
  messagingSenderId: '865309847554',
  appId: '1:865309847554:web:c63d7cb5f51b205c8c771b',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
