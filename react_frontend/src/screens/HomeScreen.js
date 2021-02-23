import './HomeScreen.css'
import Product from '../components/Product'

const HomeScreen = ({ productsData }) => {
  const products = productsData.map((product) => {
    return <Product key={product._id} productData={product} />
  })

  return (
    <div className="homescreen">
      <h2 className="homescreen-title">Latest Products (Updated Weekly)</h2>

      <div className="homescreen-products">{products}</div>
    </div>
  )
}

export default HomeScreen
