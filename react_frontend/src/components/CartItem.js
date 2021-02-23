import './CartItem.css'
import { Link } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

const CartItem = ({ cartItem, handleDelete }) => {
  return (
    <div className="cart-item">
      <div className="cart-item-img">
        <img src={cartItem.image} alt={cartItem.title} />
      </div>

      <Link to={`/product/${cartItem._id}`} className="cart-item-name">
        <p>{cartItem.title}</p>
      </Link>

      <p className="cart-item-price">${cartItem.price}</p>

      <p className="cart-item-quantity">
        Qty: {cartItem.quantity ? cartItem.quantity : 1}
      </p>

      <IconButton
        color="secondary"
        aria-label="delete todo item"
        component="span"
        onClick={() => handleDelete(cartItem._id)}
      >
        <DeleteIcon className="deleteIcon" fontSize="large" />
      </IconButton>
    </div>
  )
}

export default CartItem
