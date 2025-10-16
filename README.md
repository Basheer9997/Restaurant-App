# 🍽️ Restaurant Menu App

This project is a **React-based restaurant menu application** that fetches categories and dishes dynamically from an API.  
Users can browse dishes, customize selections, and manage a cart interactively.  

---

## 🚀 Features
- 📡 **Dynamic Data Fetching**: Menu categories and dishes are fetched from a live API.
- 🎚️ **Slidable Categories**: Tabs for categories are rendered dynamically (not hardcoded).
- 🍲 **Dish Listing**: Displays dish details such as name, description, calories, and price.
- 🛠️ **Customizations Available**: If a dish has add-ons, a "Customizations available" message is displayed.
- ➕➖ **Cart Management**:  
  - Increment (`+`) and decrement (`-`) buttons update the quantity of items.  
  - Cart icon badge updates dynamically to reflect the total items.  
- ♻️ **Reusable Components**: Built with clean, maintainable, and reusable code patterns (`TabItem`, `DishItem`, `Header`).
- ⏳ **Loading State**: Displays a spinner while fetching data.

---

## 🛠️ Tech Stack
- **React.js** (Functional components + Hooks)
- **CSS** for styling
- **react-loader-spinner** for loading indicators
- **Fetch API** for data fetching