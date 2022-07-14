/* eslint-disable prettier/prettier */
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
const firebaseConfig = {
  apiKey: 'AIzaSyAur_dfJ3XhY7cWf7UbMnnJV12FjL8LxUk',
  authDomain: 'ardent-partner.firebaseapp.com',
  projectId: 'ardent-partner',
  storageBucket: 'ardent-partner.appspot.com',
  messagingSenderId: '820966141114',
  appId: '1:820966141114:web:ba64950a3478028a546683',
  measurementId: 'G-CKZ53RTBZJ',
}
const app = initializeApp(firebaseConfig)
export default getFirestore()
