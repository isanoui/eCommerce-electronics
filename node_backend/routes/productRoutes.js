const express = require('express')
const router = express.Router()

const {
  getAllProducts,
  getProductById,
} = require('../controller/productsController')

// Get all products from database
// GET /api/products
router.get('/', getAllProducts)

// Get product by id from database
// GET /api/products/:id
router.get('/:id', getProductById)

module.exports = router
