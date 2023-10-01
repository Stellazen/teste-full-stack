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
  import { firebaseConfig } from './firebaseconfig';

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);

  // criar usuário
  export const createUser = async (email, senha, displayName) => {
  const authentication = getAuth(app);
  await createUserWithEmailAndPassword(authentication, email, senha);
  await updateProfile(authentication.currentUser, { displayName });
  };

  //login com o google
  const provider = new GoogleAuthProvider();
  export const googleLogin = () => signInWithPopup(auth, provider);

  //login com email e senha
  export const valuesLogin = (email, senha) => signInWithEmailAndPassword(auth, email, senha);
  
  // Sair do perfil do usuário 
  export const logOut = () => signOut(auth);

  // Ouvir alterações no estado de autenticação
onAuthStateChanged(auth, user => {
  if (user) {
      user.getIdToken().then(token => console.log(token));
  }
});