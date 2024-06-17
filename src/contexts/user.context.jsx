import { createContext, useState, useEffect } from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "../utils/firebase/firebase.utils";

//as the actual value you want to access
export const UserContext = createContext({
    setCurrentUser: () => null,
    currentUser: null,
});

//the actual component
/**
 * 
 * Every context that gets built for us there is a  .provider
 * .provider is the component that will wrap around any other components that need access to the value insides
 * 
 * For example
 * 
 * <UserContext.Provider>
 *  <app />
 * </UserContext.Provider>
 * 
 * app will be the children-
 * 
 * this provider is where it's going to receive the value which is going to hold the actual contextual values
 */
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };


    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if(user){
                //if the user exist get the data otherwise create de user's document
                createUserDocumentFromAuth(user);
            }
            //if the user sigin, we obtain the user.Otherwise null (sign out)
            setCurrentUser(user);
        
        })

        return unsubscribe;
    }, [])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};