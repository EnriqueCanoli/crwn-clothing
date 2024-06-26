import { CART_ACTION_TYPES } from "./cart.types";

/**This initial state just gives us the object that we need to keep track of when it comes to 
 * what our actual reducer should return
 */
export const CART_INITIAL_STATE = {
    cartItems: [],
    isCartOpen: false
}


/**
 * 
 * The reducer should not handle any business logic
 * State represent the current state of my application
 * Action is an object that describes wahr chanfe should happen
 *          -type: tells the reducer what type of action to perform
 *          -payload: carries the data for updating (in this case, payload is an object (update: cartitems,cartcount and carttotal))
 *  
 * */
export const cartReducer = (state = CART_INITIAL_STATE, action = {}) => {
    const { type, payload } = action;



    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                cartItems: payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
        default:
            return state;
    }

}
