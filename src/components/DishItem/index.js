import './index.css'

const DishItem = props => {
  const {dishDetails, addItemToCart, removeItemFromCart, cartList} = props
  const {
    dishAvailability,
    dishCalories,
    dishCurrency,
    dishDescription,
    dishImage,
    dishName,
    dishPrice,
    dishType,
    addonCat,
    dishId,
  } = dishDetails

  const onClickDecrement = () => {
    removeItemFromCart(dishDetails)
  }

  const onClickIncrement = () => {
    addItemToCart(dishDetails)
  }

  const getDishQuantity = () => {
    const isdishItemFound = cartList.find(
      dishItem => dishItem.dishId === dishId,
    )
    return isdishItemFound ? isdishItemFound.quantity : 0
  }

  const quantityControllerContainer = () => (
    <div className="quantity-controller-container">
      <button type="button" onClick={onClickDecrement}>
        -
      </button>
      <p>{getDishQuantity()}</p>
      <button type="button" onClick={onClickIncrement}>
        +
      </button>
    </div>
  )

  return (
    <li className="dish-item-container">
      <div className="dish-details-card">
        <div
          className={`dish-border-container ${
            dishType === 1 ? 'dish-type-1-border' : 'dish-type-2-border'
          }`}
        >
          <div
            className={`dish-type-container ${
              dishType === 1 ? 'dish-type-1' : 'dish-type-2'
            }`}
          />
        </div>
        <div className="dish-details-container">
          <h3 className="dish-name">{dishName}</h3>
          <p className="dish-price">
            {dishCurrency} {dishPrice}
          </p>
          <p className="dish-description">{dishDescription}</p>
          {dishAvailability ? (
            quantityControllerContainer()
          ) : (
            <p className="not-availability-text">Not available</p>
          )}
          {addonCat.length > 0 ? (
            <p className="customizations-text">Customizations available</p>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className="calories-dish-img-container">
        <p className="dish-calories">{dishCalories} calories</p>
        <img className="dish-image" src={dishImage} alt={dishName} />
      </div>
    </li>
  )
}

export default DishItem
