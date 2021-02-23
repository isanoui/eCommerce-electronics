import './SideBar.css'
import { Link } from 'react-router-dom'

import ShoppingCart from '@material-ui/icons/ShoppingCart'

const SideBar = ({ showSideBar, setShowSideBar, cartCount }) => {
  const toggleSideBar = () => {
    setShowSideBar(false)
  }

  return (
    <div className={showSideBar ? 'sidebar show' : 'sidebar'}>
      <ul className="sidebar-links">
        <li onClick={toggleSideBar}>
          <Link to="/cart">
            <ShoppingCart fontSize="large" />
            <span>
              Cart <span className="sidebar-cart-count">{cartCount}</span>
            </span>
          </Link>
        </li>
        <li onClick={toggleSideBar}>
          <Link to="/">Shop</Link>
        </li>
      </ul>
    </div>
  )
}

export default SideBar
