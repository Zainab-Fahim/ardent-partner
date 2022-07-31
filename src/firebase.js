/* eslint-disable prettier/prettier */
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
const firebaseConfig = {
  apiKey: '',
  authDomain: 'ardent-partner.firebaseapp.com',
  projectId: 'ardent-partner',
  storageBucket: 'ardent-partner.appspot.com',
  messagingSenderId: '',
  appId: '',
  measurementId: '',
}
const app = initializeApp(firebaseConfig)
export default getFirestore()
