import './CartScreen.css'
import { Link } from 'react-router-dom'

// Components
import CartItem from '../components/CartItem'

const CartScreen = ({ cartData, setCartData }) => {
  let numItems = 0
  let subtotal = 0
  // Calculate # of items and the total cost
  cartData.forEach((cartItem) => {
    if (!cartItem.hasOwnProperty('quantity')) {
      numItems += 1
      subtotal += parseFloat(cartItem.price)
    } else {
      numItems += parseInt(cartItem.quantity)
      subtotal += parseFloat(cartItem.price) * parseFloat(cartItem.quantity)
    }
  })

  const handleDelete = (id) => {
    const newCartData = cartData.filter((cartItem) => cartItem._id !== id)
    // Remove id from idList to be able to re-add to cart as it's no longer a duplicate
    const newIdList = JSON.parse(localStorage.getItem('idList')).filter(
      (currId) => currId !== id
    )
    setCartData(newCartData)
    localStorage.setItem('cartData', JSON.stringify(newCartData))
    localStorage.setItem('idList', JSON.stringify(newIdList))
  }

  const cartItems = cartData.map((cartItem) => {
    return (
      <CartItem
        key={cartItem._id}
        cartItem={cartItem}
        handleDelete={handleDelete}
      />
    )
  })

  return (
    <div className="cartscreen">
      <div className="cartscreen-left">
        <h2>Shopping Cart</h2>

        {cartItems.length == 0 ? (
          <p>
            Your cart is empty <Link to="/">Go Back</Link>
          </p>
        ) : (
          cartItems
        )}
      </div>

      <div className="cartscreen-right">
        <div className="cartscreen-info">
          <p>Subtotal ({numItems}) items</p>
          <p>${subtotal.toFixed(2)}</p>
        </div>
        <div>
          <button>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  )
}

export default CartScreen
