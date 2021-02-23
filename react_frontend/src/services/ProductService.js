import axios from 'axios'

const API_BASE_URL = 'https://ecommerce-mern-application.herokuapp.com'

class ProductService {
  getProducts() {
    return axios.get(API_BASE_URL + '/api/products/')
  }

  getProductById(id) {
    return axios.get(API_BASE_URL + '/api/products/' + id)
  }
}

export default new ProductService()
