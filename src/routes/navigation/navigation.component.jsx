import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import './navigation.styles.scss'
import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdwon from "../../components/cart-dropdown/cart-dropdown.component";
import { UserContext } from "../../contexts/user.context";
import { signOUtUser } from "../../utils/firebase/firebase.utils";
import { CartContext} from "../../contexts/cart.context";


const Navigation = () => {
    console.log("nav");
    /**Here I want the user value , not the setter*/
    const { currentUser } = useContext(UserContext);

    const {isCartOpen} = useContext(CartContext)

    const singOutHandler = async () => {
        await signOUtUser();
    }

    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to='/'>
                    <CrwnLogo className="logo" />
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to='/shop'>
                        SHOP
                    </Link>
                    {
                        currentUser ? (
                            <span className="nav-link" onClick={singOutHandler}>SIGN OUT</span>
                        ) : (
                            <Link className="nav-link" to='/auth'>
                                SIGN IN
                            </Link>
                        )
                    }
                    <CartIcon />
                </div>
                {isCartOpen && <CartDropdwon />}     
            </div>
            <Outlet />
        </Fragment>
    )
}


export default Navigation;