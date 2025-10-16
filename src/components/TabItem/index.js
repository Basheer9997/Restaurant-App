import './index.css'

const TabItem = props => {
  const {tabDetails, isTabActive, updateActiveCategoryTabId} = props
  const {menuCategory, menuCategoryId} = tabDetails
  const activeTabClassName = isTabActive ? 'active-tab-btn' : ''

  const onClickTab = () => {
    updateActiveCategoryTabId(menuCategoryId)
  }

  return (
    <li className="tab-item-container">
      <button
        type="button"
        className={`tab-btn ${activeTabClassName}`}
        onClick={onClickTab}
      >
        {menuCategory}
      </button>
    </li>
  )
}

export default TabItem
