import SignInForm from '../../components/sign-in-form/sign-in-form-component';
import SignUpForm from '../../components/sign-up/sign-up-form-component';
import './authentication.styles.scss'

const Authentication = () => {


    return (
        <div className='authentication-container'>
            <SignInForm />
            <SignUpForm />
        </div>
    )
}

export default Authentication;

/**
 * 
 * import { useEffect } from 'react';
    import { getRedirectResult } from 'firebase/auth';
 * Redirect page
 * useEffect(async () => {
        /**Get me the response form the redirect result, because if the user click Sign in with Google Redirect button
         * you have to retrive somehow the result when return to the sign page
         *   The auth is helping us to keep teack of all these authentication states that are happenign thorughout the application
         */
        /*const response = getRedirectResult(auth)

        if(response){ //if response is not null
            const userDocRef = await createUserDocumentFromAuth(response.user);
        }
    }, [])


    <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button>
 */