import './Navbar.css'
import { Link } from 'react-router-dom'

import ShoppingCart from '@material-ui/icons/ShoppingCart'

const Navbar = ({ setShowSideBar, cartCount }) => {
  const toggleSideBar = () => {
    setShowSideBar(true)
  }

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/">
          <h2>Best Selling Electronics</h2>
        </Link>
      </div>

      <ul className="nav-links">
        <li>
          <Link to="/cart" className="cart-link">
            <ShoppingCart fontSize="large" />
            <span>
              Cart
              <span className="cart-count">{cartCount}</span>
            </span>
          </Link>
        </li>
        <li>
          <Link to="/">Shop</Link>
        </li>
      </ul>

      <div className="hamburger-menu" onClick={toggleSideBar}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  )
}

export default Navbar
