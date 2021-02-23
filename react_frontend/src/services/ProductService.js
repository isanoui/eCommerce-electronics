import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000'

class ProductService {
  getProducts() {
    return axios.get(API_BASE_URL + '/api/products/')
  }

  getProductById(id) {
    return axios.get(API_BASE_URL + '/api/products/' + id)
  }
}

export default new ProductService()
