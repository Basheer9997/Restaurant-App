import Cookies from 'js-cookie'
import {IoCartOutline} from 'react-icons/io5'
import {useHistory, Link} from 'react-router-dom'
import {useContext} from 'react'

import CartContext from '../../context/CartContext'

import './index.css'

const Header = () => {
  const history = useHistory()

  const {cartList, restaurantName} = useContext(CartContext)
  console.log(restaurantName)

  const getCartItemsCount = () =>
    cartList.reduce((acc, item) => acc + item.quantity, 0)

  const goToCart = () => {
    history.replace('/cart')
  }

  const renderCartIcon = () => (
    <div className="cart-icon-container">
      <button
        type="button"
        className="cart-btn"
        onClick={goToCart}
        data-testid="cart"
      >
        <IoCartOutline size={25} />
      </button>
      <div className="cart-count-badge">
        <p className="m-0 cart-count">{cartList.length}</p>
      </div>
    </div>
  )

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-header">
      <Link to="/" className="restaurent-link">
        <h1 className="restaurent-name">{restaurantName}</h1>
      </Link>

      <div className="my-orders-cart-container">
        <p className="my-orders-text">My Orders</p>
        {renderCartIcon()}
        <button
          type="button"
          className="logout-desktop-btn"
          onClick={onClickLogout}
        >
          Logout
        </button>
      </div>
      {/* <header className="p-4 d-flex flex-row align-items-center nav-header">
      <h1 className="m-0 logo-heading">UNI Resto Cafe</h1>
      <div className="d-flex flex-row align-items-center ms-auto">
        <p className="mt-0 mb-0 me-2 d-none d-sm-block my-orders-text">
          My Orders
        </p>
        {renderCartIcon()}
      </div>
    </header> */}
    </nav>
  )
}

export default Header
