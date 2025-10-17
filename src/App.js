import {useState} from 'react'

import {Route, Switch, Redirect} from 'react-router-dom'

import Home from './components/Home'
import LoginForm from './components/LoginForm'
import Cart from './components/Cart'
import CartContext from './context/CartContext'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'

import './App.css'

const App = () => {
  const [cartList, setCartList] = useState([])
  const [restaurantName, setRestaurantName] = useState('')
  console.log(restaurantName)

  const removeAllCartItems = () => {
    setCartList([])
  }

  const addCartItem = dishDetails => {
    const isItemFound = cartList.find(
      item => item.dishId === dishDetails.dishId,
    )
    if (!isItemFound) {
      setCartList(prev => [...prev, dishDetails])
    } else {
      setCartList(prev =>
        prev.map(item =>
          item.dishId === dishDetails.dishId
            ? {...item, quantity: item.quantity + 1}
            : item,
        ),
      )
    }
  }

  const removeCartItem = dishId => {
    setCartList(cartList.filter(cartItem => cartItem.dishId !== dishId))
  }

  const incrementCartItemQuantity = dishId => {
    const updatedCartList = cartList.map(cartItem =>
      cartItem.dishId === dishId
        ? {...cartItem, quantity: cartItem.quantity + 1}
        : cartItem,
    )

    setCartList(updatedCartList)
  }

  const decrementCartItemQuantity = dishId => {
    const updatedCartList = cartList
      .map(cartItem =>
        cartItem.dishId === dishId
          ? {...cartItem, quantity: cartItem.quantity - 1}
          : cartItem,
      )
      .filter(cartItem => cartItem.quantity > 0)

    setCartList(updatedCartList)
  }

  return (
    <CartContext.Provider
      value={{
        cartList,
        restaurantName,
        setRestaurantName,
        removeAllCartItems,
        addCartItem,
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      }}
    >
      <Switch>
        <Route exact path="/login" component={LoginForm} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/cart" component={Cart} />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="not-found" />
      </Switch>
    </CartContext.Provider>
  )
}

export default App
