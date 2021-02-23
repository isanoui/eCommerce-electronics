import { useState, useEffect } from 'react'

import './ProductInfoScreen.css'
import { useParams } from 'react-router-dom'

// Services
import ProductService from '../services/ProductService'

const ProductInfoScreen = ({ cartData, setCartData }) => {
  // Get id in url to use to fetch product by id from DB
  let { id } = useParams()

  const [productData, setProductData] = useState([])

  // Load our product data from DB
  useEffect(() => {
    ProductService.getProductById(id).then((res) => {
      setProductData(res.data)
    })
  }, [id])

  // Use localstorage to save cart items on refresh
  const addToCartHandler = () => {
    if (cartData.length === 0) {
      setCartData([productData])
      localStorage.setItem('cartData', JSON.stringify([productData]))
      localStorage.setItem('idList', JSON.stringify([productData._id]))
    } else {
      let duplicateCartItem = false
      // Check if id of cart item trying to add already exists
      JSON.parse(localStorage.getItem('idList')).forEach((id) => {
        if (id === productData._id) {
          duplicateCartItem = true
        }
      })
      // Don't add duplicate items to cart
      if (!duplicateCartItem) {
        setCartData([...cartData, productData])
        localStorage.setItem(
          'cartData',
          JSON.stringify([
            ...JSON.parse(localStorage.getItem('cartData')),
            productData,
          ])
        )
        localStorage.setItem(
          'idList',
          JSON.stringify([
            ...JSON.parse(localStorage.getItem('idList')),
            productData._id,
          ])
        )
      }
    }
  }

  const handleSelect = (e) => {
    productData.quantity = e.target.value
  }

  return (
    <div className="product-info-screen">
      <div className="product-image">
        <img src={productData.image} alt={productData.title} />
      </div>

      <div className="product-info-card">
        <p className="product-info-name">{productData.title}</p>
        <p className="product-info-price">${productData.price}</p>
      </div>

      <div className="cart-card">
        <p>
          Price: <span>${productData.price}</span>
        </p>
        <p>
          Status: <span>In Stock</span>
        </p>
        <p>
          Quantity
          <select onChange={handleSelect}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </p>
        <p>
          <button type="button" onClick={() => addToCartHandler()}>
            Add To Cart
          </button>
        </p>
      </div>
    </div>
  )
}

export default ProductInfoScreen
