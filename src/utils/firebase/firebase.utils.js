/**
 * set up firebase
 */

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} from 'firebase/auth'

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCp_O3tVD84tDEiAAqDUUUsMUUXycGmxdQ",
    authDomain: "crwn-clothing-db-18682.firebaseapp.com",
    projectId: "crwn-clothing-db-18682",
    storageBucket: "crwn-clothing-db-18682.appspot.com",
    messagingSenderId: "113010371590",
    appId: "1:113010371590:web:dcfdc91e604c668b39a787"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

/**
 * Set up firestore data base
 */

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) =>{
    /**
     * This method get the user's document reference. (Non relational data base)
     * database, collections, identifier(user's unique ID)
     * We get of the response of the signInWithGooglePopup(), In the response, there is an UID, what we will use.
     */
    const userDocRef = doc(db, 'users', userAuth.uid);

    /*Get the data related to a docuemnt*/
    const userSnapShot = await getDoc(userDocRef);

    if(!userSnapShot.exists()){ //if not exist, create the user
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        }catch(error){
            console.log('error creating the user', error.message)
        }
    }
    //otherwise return the user document's reference
    return userDocRef;


}

/**
 * Sing In with redirect
 */

/** There are many provdiers to authenticate such as Google, Fb, gitgub. In this case we pass google as provider */
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);




/**
 * Create user with email and password
 */

export const createAuthUserWithEmailAndPassword = async (email,password) =>{
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth,email,password);
}

/**
 * Sing in with email and password
 */

export const signInAuthUserWithEmailAndPassword = async (email,password) =>{
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth,email,password);
}

/**
 * SING OUT
 */

export const signOUtUser = async () => await signOut(auth);

/**
 * Observable listener
 * It returns you back whatever you get back from on AuthStateChanged
 * It takes to parameters, auth and callback
 * Some callabck that you want to call every time this auth changes
 * 
 * onAuthStateChanged -> always is listenning for a change
 */

export const onAuthStateChangedListener = (callabck) => onAuthStateChanged(auth, callabck);