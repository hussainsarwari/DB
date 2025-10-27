import {initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider,FacebookAuthProvider} from "firebase/auth";
const firebaseConfig={
     apiKey: "AIzaSyAePXKUuyRsybZ-Xl07syTeZengsR0qe4c",
  authDomain: "database-3c412.firebaseapp.com",
  projectId: "database-3c412",
  storageBucket: "database-3c412.firebasestorage.app",
  messagingSenderId: "946632939281",
  appId: "1:946632939281:web:76e461f3e3c847977c9eb0",
  measurementId: "G-6G6ZDVFEBF"
}
const app=initializeApp(firebaseConfig);
const auth=getAuth(app);
const googleProvider=new GoogleAuthProvider();
const facebookProvider=new FacebookAuthProvider();
export {auth, googleProvider, facebookProvider};