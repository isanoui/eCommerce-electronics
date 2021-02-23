import './App.css'
import { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

// Services
import ProductService from './services/ProductService'

// Components
import Navbar from './components/Navbar'
import Backdrop from './components/Backdrop'
import SideBar from './components/SideBar'

// Screens
import HomeScreen from './screens/HomeScreen'
import ProductInfoScreen from './screens/ProductInfoScreen'
import CartScreen from './screens/CartScreen'

function App() {
  const [showSideBar, setShowSideBar] = useState(false)
  const [productsData, setProductsData] = useState([])
  const [cartData, setCartData] = useState([])

  // Load product data from DB
  useEffect(() => {
    ProductService.getProducts().then((res) => {
      setProductsData(res.data)
    })
  }, [])

  // Load cart items from localstorage
  useEffect(() => {
    setCartData(JSON.parse(localStorage.getItem('cartData')) || [])
  }, [])

  return (
    <div className="app">
      <BrowserRouter>
        <Navbar setShowSideBar={setShowSideBar} cartCount={cartData.length} />
        <SideBar
          showSideBar={showSideBar}
          setShowSideBar={setShowSideBar}
          cartCount={cartData.length}
        />
        <Backdrop showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
        <Switch>
          <Route
            exact
            path="/"
            render={() => <HomeScreen productsData={productsData} />}
          />
          <Route
            exact
            path="/product/:id"
            render={() => (
              <ProductInfoScreen
                cartData={cartData}
                setCartData={setCartData}
              />
            )}
          />
          <Route
            exact
            path="/cart"
            render={() => (
              <CartScreen cartData={cartData} setCartData={setCartData} />
            )}
          />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
