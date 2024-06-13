/**
 * set up firebase
 */

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'

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

export const createUserDocumentFromAuth = async (userAuth) =>{
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
                createdAt
            })
        }catch(error){
            console.log('error creating the user', error.message)
        }
    }
    //otherwise return the user document's reference
    return userDocRef;


}
