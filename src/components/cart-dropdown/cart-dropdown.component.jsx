import { CartDropdownContainer, EmptyMessage, CartItems} from './cart-dropdown.styles.jsx'

import Button from '../button/button.component'

import CartItem from '../card-item/cart-item.component'

import { useContext } from 'react'

import { CartContext } from '../../contexts/cart.context'

import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux'
import { selectCartItems } from '../../store/cart/cart.selector.js'

const CartDropdown = () => {
    //const { cartItems } = useContext(CartContext);
    const cartItems = useSelector(selectCartItems);

    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate('/checkout');
    };

    return (
        <CartDropdownContainer>
            <CartItems>
                {cartItems.length ? (
                    cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
                ) : (
                    <EmptyMessage>Your cart is empty</EmptyMessage>
                )}
            </CartItems>
            <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </CartDropdownContainer>
    );
};

export default CartDropdown;