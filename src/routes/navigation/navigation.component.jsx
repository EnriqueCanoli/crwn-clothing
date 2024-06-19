import { Fragment, useContext } from "react";
import { Outlet, Link, NavLink } from "react-router-dom";
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'

import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdwon from "../../components/cart-dropdown/cart-dropdown.component";
import { UserContext } from "../../contexts/user.context";
import { signOUtUser } from "../../utils/firebase/firebase.utils";
import { CartContext } from "../../contexts/cart.context";

import { LogoContainer, NavLinks, NavigationContainer } from './navigation.styles.jsx'

const Navigation = () => {
    console.log("nav");
    /**Here I want the user value , not the setter*/
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