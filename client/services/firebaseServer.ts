import { initializeApp, cert } from 'firebase-admin/app';

// get this JSON from the Firebase board
// you can also store the values in environment variables
//import serviceAccount from '../our-bookmarks-18a31-firebase-adminsdk-1hh3k-55fb46f4c9.json'; 

const firebaseAdmin = initializeApp({
  credential: cert({
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    projectId: process.env.FIREBASE_PROJECT_ID,
  }),
  storageBucket: process.env.NEXT_PUBLIC_FIRESTORE_STORAGE_BUCKET
});

export { firebaseAdmin };