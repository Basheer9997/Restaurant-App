import {useState, useEffect, useContext} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import DishItem from '../DishItem'
import TabItem from '../TabItem'

import CartContext from '../../context/CartContext'

import './index.css'

const Home = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [activeTabId, setActiveTabId] = useState('')
  const [menuCategories, setMenuCategories] = useState([])

  const {cartList, setRestaurantName} = useContext(CartContext)

  // const addItemToCart = dishDetails => {
  //   const isItemFound = cartList.find(
  //     item => item.dishId === dishDetails.dishId,
  //   )
  //   if (!isItemFound) {
  //     const newDish = {...dishDetails, quantity: 1}
  //     setCartList(prev => [...prev, newDish])
  //   } else {
  //     setCartList(prev =>
  //       prev.map(item =>
  //         item.dishId === dishDetails.dishId
  //           ? {...item, quantity: item.quantity + 1}
  //           : item,
  //       ),
  //     )
  //   }
  // }

  // const removeItemFromCart = dish => {
  //   const isAlreadyExists = cartList.find(item => item.dishId === dish.dishId)
  //   if (isAlreadyExists) {
  //     setCartList(prev =>
  //       prev
  //         .map(item =>
  //           item.dishId === dish.dishId
  //             ? {...item, quantity: item.quantity - 1}
  //             : item,
  //         )
  //         .filter(item => item.quantity > 0),
  //     )
  //   }
  // }

  const transformMenuData = tableMenuList =>
    tableMenuList.map(eachMenu => ({
      menuCategory: eachMenu.menu_category,
      menuCategoryId: eachMenu.menu_category_id,
      menuCategoryImage: eachMenu.menu_category_image,
      categoryDishes: eachMenu.category_dishes.map(eachDish => ({
        dishId: eachDish.dish_id,
        dishName: eachDish.dish_name,
        dishPrice: eachDish.dish_price,
        dishImage: eachDish.dish_image,
        dishCurrency: eachDish.dish_currency,
        dishCalories: eachDish.dish_calories,
        dishDescription: eachDish.dish_description,
        dishAvailability: eachDish.dish_Availability,
        dishType: eachDish.dish_Type,
        addonCat: eachDish.addonCat,
      })),
    }))

  const fetchMenuData = async () => {
    const api =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const apiResponse = await fetch(api)
    const data = await apiResponse.json()
    const updatedData = transformMenuData(data[0].table_menu_list)
    setMenuCategories(updatedData)
    setRestaurantName(data[0].restaurant_name)
    setActiveTabId(updatedData[0].menuCategoryId)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchMenuData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateActiveCategoryTabId = menuCategoryId => {
    setActiveTabId(menuCategoryId)
  }

  const renderLoader = () => (
    <div className="spinner-container">
      <Loader type="TailSpin" color="green" height={50} width={50} />
    </div>
  )

  const renderTabs = () => (
    <ul className="tabsList-container">
      {menuCategories.map(tabDetails => (
        <TabItem
          key={tabDetails.menuCategoryId}
          tabDetails={tabDetails}
          isTabActive={activeTabId === tabDetails.menuCategoryId}
          updateActiveCategoryTabId={updateActiveCategoryTabId}
        />
      ))}
    </ul>
  )

  const renderDishes = () => {
    const activeCategory = menuCategories.find(
      eachCategory => eachCategory.menuCategoryId === activeTabId,
    )
    const categoryDishes = activeCategory ? activeCategory.categoryDishes : []
    return (
      <ul className="dishList-container">
        {categoryDishes.map(eachDish => (
          <DishItem key={eachDish.dishId} dishDetails={eachDish} />
        ))}
      </ul>
    )
  }

  return (
    <>
      {isLoading ? (
        renderLoader()
      ) : (
        <div className="home-background">
          <Header />
          {renderTabs()}
          {renderDishes()}
        </div>
      )}
    </>
  )
}

export default Home
