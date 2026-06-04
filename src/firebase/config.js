import app from 'firebase/app'
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyDsq3fyMoz57rGMxN9VpQ_AS4CnSs3O6r0",
  authDomain: "mi-proyecto-firebase-2026.firebaseapp.com",
  projectId: "mi-proyecto-firebase-2026",
  storageBucket: "mi-proyecto-firebase-2026.firebasestorage.app",
  messagingSenderId: "116733544132",
  appId: "1:116733544132:web:4584c9a4feb07226bf6b91"
};

app.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const db = app.firestore()