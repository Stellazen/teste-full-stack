import { initializeApp } from "firebase/app";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    getAuth,
    signOut,
    updateProfile,
    onAuthStateChanged,
  } from 'firebase/auth';
  
  const firebaseConfig = {
    apiKey: "AIzaSyDk-k-vauTqICPVM9lSDClg5T0L2KyE6xo",
    authDomain: "aquidev-5f229.firebaseapp.com",
    projectId: "aquidev-5f229",
    storageBucket: "aquidev-5f229.appspot.com",
    messagingSenderId: "83788541614",
    appId: "1:83788541614:web:dd7baec5a5793c1f26473f"
  };

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);

  export const createUser = async (email, senha, displayName) => {
  const authentication = getAuth(app);
  await createUserWithEmailAndPassword(authentication, email, senha);
  await updateProfile(authentication.currentUser, { displayName });
  };

  const provider = new GoogleAuthProvider();
  export const googleLogin = () => signInWithPopup(auth, provider);

  export const valuesLogin = (email, senha) => signInWithEmailAndPassword(auth, email, senha);
 
  export const logOut = () => signOut(auth);

  onAuthStateChanged(auth, user => {
  if (user) {
      user.getIdToken().then(token => console.log(token));
  }
});