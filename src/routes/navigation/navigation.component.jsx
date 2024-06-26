import { Fragment, useContext } from "react";
import { Outlet, Link, NavLink } from "react-router-dom";
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'

import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdwon from "../../components/cart-dropdown/cart-dropdown.component";
import { UserContext } from "../../contexts/user.context";
import { signOUtUser } from "../../utils/firebase/firebase.utils";
import { CartContext } from "../../contexts/cart.context";

import { LogoContainer, NavLinks, NavigationContainer } from './navigation.styles.jsx'
import { selectCurrentUser } from "../../store/user/user.selector.js";

/**
 * it is a hook that allow us to interact from a component with the redux store
 */
import { useSelector } from "react-redux";
import { selectIsCartOpen } from "../../store/cart/cart.selector.js";

const Navigation = () => {
    /**
     * useSlector extracts the values that yu want from the whole entire redux store
     */
    const currentUser =  useSelector(selectCurrentUser)

   // const { isCartOpen } = useContext(CartContext)
    const isCartOpen = useSelector(selectIsCartOpen);
    
    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <CrwnLogo />
                </LogoContainer>
                <NavLinks>
                    <NavLink to='/shop'>SHOP</NavLink>

                    {currentUser ? (
                        <NavLink as='span' onClick={signOUtUser}>
                            SIGN OUT
                        </NavLink>
                    ) : (
                        <NavLink to='/auth'>SIGN IN</NavLink>
                    )}
                    <CartIcon />
                </NavLinks>
                {isCartOpen && <CartDropdwon />}
            </NavigationContainer>
            <Outlet />
        </Fragment>
    )
}


export default Navigation;


/**
 * 
 * import { Fragment, useContext } from "react";
import { Outlet, Link, NavLink } from "react-router-dom";
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'

import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdwon from "../../components/cart-dropdown/cart-dropdown.component";
import { UserContext } from "../../contexts/user.context";
import { signOUtUser } from "../../utils/firebase/firebase.utils";
import { CartContext } from "../../contexts/cart.context";

import { LogoContainer, NavLinks, NavigationContainer } from './navigation.styles.jsx'


const Navigation = () => {

    const { currentUser } = useContext(UserContext);

    const { isCartOpen } = useContext(CartContext)

    const signOutUser = async () => {
        await signOUtUser();
    }

    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <CrwnLogo />
                </LogoContainer>
                <NavLinks>
                    <NavLink to='/shop'>SHOP</NavLink>

                    {currentUser ? (
                        <NavLink as='span' onClick={signOutUser}>
                            SIGN OUT
                        </NavLink>
                    ) : (
                        <NavLink to='/auth'>SIGN IN</NavLink>
                    )}
                    <CartIcon />
                </NavLinks>
                {isCartOpen && <CartDropdwon />}
            </NavigationContainer>
            <Outlet />
        </Fragment>
    )
}


export default Navigation;
 */