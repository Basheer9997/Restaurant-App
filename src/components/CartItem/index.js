import {useContext} from 'react'

import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {AiFillCloseCircle} from 'react-icons/ai'

import CartContext from '../../context/CartContext'

import './index.css'

const CartItem = props => {
  const {cartItemDetails} = props

  const {
    removeCartItem,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
  } = useContext(CartContext)

  const {dishId, dishName, dishPrice, dishImage, quantity} = cartItemDetails

  const onRemoveCartItem = () => {
    removeCartItem(dishId)
  }

  const onClickincrementCartItemQuantity = () => {
    incrementCartItemQuantity(dishId)
  }

  const onClickdecrementCartItemQuantity = () => {
    decrementCartItemQuantity(dishId)
  }

  return (
    <li className="cart-item">
      <img className="cart-product-image" src={dishImage} alt={dishName} />
      <div className="cart-item-details-container">
        <div className="cart-product-title-brand-container">
          <p className="cart-product-title">{dishName}</p>
        </div>
        <div className="cart-quantity-container">
          <button
            type="button"
            className="quantity-controller-button"
            data-testid="minus"
            onClick={onClickdecrementCartItemQuantity}
          >
            <BsDashSquare color="#52606D" size={12} />
          </button>
          <p className="cart-quantity">{quantity}</p>
          <button
            type="button"
            className="quantity-controller-button"
            data-testid="plus"
            onClick={onClickincrementCartItemQuantity}
          >
            <BsPlusSquare color="#52606D" size={12} />
          </button>
        </div>
        <div className="total-price-remove-container">
          <p className="cart-total-price">SAR {dishPrice * quantity}/-</p>
          <button
            className="remove-button"
            type="button"
            onClick={onRemoveCartItem}
          >
            Remove
          </button>
        </div>
      </div>
      <button
        className="delete-button"
        type="button"
        onClick={onRemoveCartItem}
        data-testid="remove"
      >
        <AiFillCloseCircle color="#616E7C" size={20} />
      </button>
    </li>
  )
}
export default CartItem
