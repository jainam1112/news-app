import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyDszoZDCI4seDvTBI9xPIQvK45hEw7YRcI",
    authDomain: "my-news-app-3db70.firebaseapp.com",
    projectId: "my-news-app-3db70",
    storageBucket: "my-news-app-3db70.appspot.com",
    messagingSenderId: "18390222567",
    appId: "1:18390222567:web:703fa900d17bcb67824442",
    measurementId: "G-GY9LHPPFXR"
  };

  firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();


const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

export const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get()
    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

export const updateFavKeywords = async (uid,keywords) => {
    if (!uid) return null;
    try {
      const userDocument = await firestore.doc(`users/${uid}`).update({
        favourites:keywords
            });
        ;
  
    
    } catch (error) {
      console.error("Error fetching user", error);
    }
  };