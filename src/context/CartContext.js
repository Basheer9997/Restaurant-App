import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  restaurantName: '',
  setRestaurantName: () => {},
  removeAllCartItems: () => {},
  addCartItem: () => {},
  removeCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
})

export default CartContext
