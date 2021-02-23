import './Product.css'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'

const Product = ({ productData }) => {
  return (
    <div className="product">
      <img src={productData.image} alt={productData.title} />

      <div className="info-container">
        <p className="product-name">{productData.title}</p>
        <p className="product-price">${productData.price}</p>
        <Link to={`/product/${productData._id}`} className="button-link">
          <Button className="view-button" variant="contained" color="primary">
            View
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default Product
