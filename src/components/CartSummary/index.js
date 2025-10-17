import {useState, useContext} from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import './index.css'
import CartContext from '../../context/CartContext'

const CartSummary = () => {
  const {cartList} = useContext(CartContext)
  const noOfItems = cartList.length

  const totalAmount = cartList.reduce(
    (acc, cartItem) => acc + cartItem.dishPrice * cartItem.quantity,
    0,
  )

  return <PaymentPopup noOfItems={noOfItems} totalAmount={totalAmount} />
}

const PaymentPopup = ({noOfItems, totalAmount}) => {
  const [paymentMethod, setPaymentMethod] = useState('')
  const [orderPlaced, setOrderPlaced] = useState(false)

  const handleConfirm = () => {
    if (paymentMethod === 'cod') {
      setOrderPlaced(true)
    }
  }

  return (
    <div className="cart-summary-container">
      <h1 className="total-amount-heading">
        Order Total:
        <span className="total-amount"> SAR {totalAmount}/-</span>
      </h1>
      <p className="no-of-items">{noOfItems} Items in cart</p>

      <Popup
        modal
        trigger={
          <button type="button" className="checkout-button">
            Checkout
          </button>
        }
      >
        {close => (
          <div className="popup-container">
            {!orderPlaced ? (
              <>
                <h2 className="popup-title">Choose Payment Method</h2>
                <form className="payment-options">
                  <label>
                    <input type="radio" name="payment" disabled /> Card
                  </label>
                  <label>
                    <input type="radio" name="payment" disabled /> Net Banking
                  </label>
                  <label>
                    <input type="radio" name="payment" disabled /> UPI
                  </label>
                  <label>
                    <input type="radio" name="payment" disabled /> Wallet
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      onChange={e => setPaymentMethod(e.target.value)}
                    />{' '}
                    Cash on Delivery
                  </label>
                </form>

                <div className="summary-details">
                  <p>Items: {noOfItems}</p>
                  <p>Total Amount: SAR {totalAmount}/-</p>
                </div>

                <button
                  type="button"
                  className="confirm-order-button"
                  disabled={paymentMethod !== 'cod'}
                  onClick={handleConfirm}
                >
                  Confirm Order
                </button>
              </>
            ) : (
              <div className="success-message">
                <h2>Your order has been placed successfully 🎉</h2>
                <button
                  type="button"
                  className="close-popup-button"
                  onClick={close}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        )}
      </Popup>
    </div>
  )
}

export default CartSummary
