import './index.css'
import {IoCartOutline} from 'react-icons/io5'

const Header = ({cartList}) => {
  const getCartItemsCount = () =>
    cartList.reduce((acc, item) => acc + item.quantity, 0)

  const renderCartIcon = () => (
    <div className="cart-icon-container">
      <IoCartOutline size={25} />
      <div className="cart-count-badge">
        <p className="m-0 cart-count">{getCartItemsCount()}</p>
      </div>
    </div>
  )

  return (
    <nav className="nav-header">
      <h1 className="restaurent-name">UNI Resto Cafe</h1>
      <div className="my-orders-cart-container">
        <p className="my-orders-text">My Orders</p>
        {renderCartIcon()}
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
