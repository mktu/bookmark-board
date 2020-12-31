import * as firebaseAdmin from 'firebase-admin';

// get this JSON from the Firebase board
// you can also store the values in environment variables
//import serviceAccount from '../our-bookmarks-18a31-firebase-adminsdk-1hh3k-55fb46f4c9.json'; 
if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      projectId: process.env.FIREBASE_PROJECT_ID,
    }),
    databaseURL: 'https://YOUR_PROJECT_ID.firebaseio.com',
  });
}

export { firebaseAdmin };