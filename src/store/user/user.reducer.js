/**
 * This reducer is going to literally be our reducer
 */
import { USER_ACTION_TYPES } from "./user.types";

/**
 * This is the initial state of the context, where currentUser is initially null.
 * The INITIAL_STATE is used by the useReducer hook to define the initial state of the reducer. 
 */
const INITIAL_STATE = {
    currentUser: null,
};

/**
 * This is the reducer function. It takes the current state and an action as arguments, and returns a new state based on the action type. 
 * As we don't use here the useReducer hook, we need to give a default value which will be initial the state
 * The defaul statement must have to return the actual state, because redux is a global store, so when an action is used by categories and not
 * for user, we have to maintain the user state. So, my code know "oh okay hits part of my reeducer did not change bacuase this reducer does not need to change"
 */


export const userReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return { ...state, currentUser: payload };
        default:
            return state;
    }
};