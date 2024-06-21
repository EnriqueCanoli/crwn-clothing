/**Using Reducer */
import { type } from '@testing-library/user-event/dist/type';
import { createContext, useReducer} from 'react';
import { createAction } from '../utils/firebase/reducer/reducer.utils';

export const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );

    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    }

    return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const removeCartItem = (cartItems, cartItemToRemove) => {
    //find the cart item to remove
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );
    //check if quantity is equal to 1, if it is remove that item from the cart
    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
    }
    //return back caritems with matching cart items with reduced quantity
    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === cartItemToRemove.id
                ? { ...cartItem, quantity: cartItem.quantity - 1 }
                : cartItem
        );
    }
}


const clearCartItem = (cartItems, cartItemToClear) =>
    cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const CartContext = createContext({
    isCartOpen: false,
    setIsOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    removeItemFromCart: () => { },
    clearItemFromCart: () => { },
    cartCount: 0,
    cartTotal: 0
});
/**
 * ACTIONS, to dont make mistake when we typed ot
 */

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

/**This initial state just gives us the object that we need to keep track of when it comes to 
 * what our actual reducer should return
 */
const INITIAL_STATE = {
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
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
const cardReducer = (state, action) =>{
    const {type, payload} = action;

    

    switch(type){
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return{
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen:payload
            }
        default:
            throw new Error(`Unhandled type of ${type} in cartReducer`)
    }

}

export const CartProvider = ({ children }) => {
    /**
     * Returns 2 elements:
     *      -the first is an array with the current state values,
     *      -The second one is a function used to dispatch action to the reducer
     */
    const [{cartItems, cartCount,cartTotal, isCartOpen},dispatch] = useReducer(cardReducer,INITIAL_STATE);

    /**
     * 
     * When dispatch is called, React invokes the cardReducer, passing the current state and the action.
     * When an action is dispatched using dispatch, React re-evaluates the component and re-renders it if the state has changed
     * This function is called when the use add an item (addItemToCart ) remove an item (removeItemFromCart)
     */
    const updateCartItemsReduer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total, carItem) => total + carItem.quantity, 0)

        const newCartTotal = newCartItems.reduce((total, carItem) => total + carItem.quantity * carItem.price, 0)

        dispatch({type: CART_ACTION_TYPES.SET_CART_ITEMS,payload:{cartItems: newCartItems, cartTotal: newCartTotal, cartCount:newCartCount}})
        //with tue reducer.utils.js we can do the same as the last function but more clearly
        //dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS,{cartItems: newCartItems, cartTotal: newCartTotal, cartCount:newCartCount} ));
    }
    
    const addItemToCart = (product) =>{
        const newCartItems = addCartItem(cartItems, product);
        updateCartItemsReduer(newCartItems)
    }
        

    const removeItemFromCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove);
        updateCartItemsReduer(newCartItems)
    }

    const clearItemFromCart = (cartItemToClear) => {
        const newCartItems =clearCartItem(cartItems, cartItemToClear);
        updateCartItemsReduer(newCartItems)
    }

    const setIsCartOpen = (bool) => {
        dispatch({type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload:bool})
    }

    const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount, removeItemFromCart, clearItemFromCart, cartTotal };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};












/* using useState
import { createContext, useEffect, useState } from 'react';

export const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );

    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    }

    return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const removeCartItem = (cartItems, cartItemToRemove) => {
    //find the cart item to remove
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );
    //check if quantity is equal to 1, if it is remove that item from the cart
    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
    }
    //return back caritems with matching cart items with reduced quantity
    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === cartItemToRemove.id
            /*  ? { ...cartItem, quantity: cartItem.quantity - 1 }
                : cartItem
        );
    }
}


const clearCartItem = (cartItems, cartItemToClear) =>
    cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const CartContext = createContext({
    isCartOpen: false,
    setIsOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    removeItemFromCart: () => { },
    clearItemFromCart: () => { },
    cartCount: 0,
    cartTotal: 0
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal,setCartTotal] = useState(0)

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, carItem) => total + carItem.quantity, 0)
        setCartCount(newCartCount);
    }, [cartItems])

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, carItem) => total + carItem.quantity * carItem.price, 0)
        setCartTotal(newCartTotal)
    }, [cartItems])


    const addItemToCart = (product) =>
        setCartItems(addCartItem(cartItems, product));

    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    }

    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear));
    }

    const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount, removeItemFromCart, clearItemFromCart, cartTotal };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
*/