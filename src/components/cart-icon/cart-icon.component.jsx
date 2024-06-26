import './cart-icon.styles.scss'
import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'

import { useContext } from 'react'

import { CartContext } from '../../contexts/cart.context'

import { useDispatch, useSelector } from 'react-redux'
import { selectCartCount, selectIsCartOpen } from '../../store/cart/cart.selector'
import { setIsCartOpen } from '../../store/cart/cart.action'


const CartIcon = () => {
    //const{isCartOpen, setIsCartOpen, cartCount} = useContext(CartContext);
    //const toggleIsCartonOpen = () => setIsCartOpen(!isCartOpen)
    const dispatch = useDispatch();

    const cartCount = useSelector(selectCartCount);
    const isCartOpen = useSelector(selectIsCartOpen);

    const toggleIsCartonOpen = () => dispatch(setIsCartOpen(!isCartOpen));

    


    return(
        <div className='cart-icon-container' onClick={toggleIsCartonOpen}>
            <ShoppingIcon className='shopping-icon'/>
            <span className='item-count'>{cartCount}</span>
        </div>
        
        
    )
}

export default CartIcon;