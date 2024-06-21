import { createContext, useEffect, useReducer } from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "../utils/firebase/firebase.utils";
import { createAction } from "../utils/firebase/reducer/reducer.utils";


/**
 *  This context will hold the current user state and a function to update 
 * This default value is used by React if a component consuming the context is rendered outside of a provider. 
 */
export const UserContext = createContext({
    setCurrentUser: () => null,
    currentUser: null,
});

/**
 * This defines the action types for the reducer
 */
export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER',
};

/**
 * This is the initial state of the context, where currentUser is initially null.
 * The INITIAL_STATE is used by the useReducer hook to define the initial state of the reducer. 
 */
const INITIAL_STATE = {
    currentUser: null,
};

/**
 * This is the reducer function. It takes the current state and an action as arguments, and returns a new state based on the action type. 
 */
const userReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return { ...state, currentUser: payload };
        default:
            throw new Error(`Unhandled type ${type} in userReducer`);
    }
};

export const UserProvider = ({ children }) => {

    /**
     * how to utilize our useReducer
     * It takes to values (reducer, State's initial value)
     * 
     * The ruducer give us back to values, th state object and dispatch function
     * Dispatch is a function that whenever you call it, you pass it an action object
     *  Hence, dispatch will call the actions that you need
    */
    const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);

    const setCurrentUser = (user) =>
        dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        });

        return unsubscribe;
    }, []);

    console.log(currentUser);

    const value = {
        currentUser,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};


/**
 * Using context

import { createContext, useState, useEffect, useReducer } from "react";
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
/*export const UserProvider = ({ children }) => {
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


 */