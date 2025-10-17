import {useContext} from 'react'

import CartItem from '../CartItem'
import CartContext from '../../context/CartContext'

import './index.css'

const CartListView = () => {
  const {cartList} = useContext(CartContext)

  return (
    <ul className="cart-list">
      {cartList.map(eachCartItem => (
        <CartItem key={eachCartItem.dishId} cartItemDetails={eachCartItem} />
      ))}
    </ul>
  )
}

export default CartListView
