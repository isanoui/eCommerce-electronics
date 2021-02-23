// To load variables from .env file into process.env
require('dotenv').config()

const express = require('express')
var cors = require('cors')
const connectDB = require('./config/db')
const axios = require('axios')
const cron = require('node-cron')

const Product = require('./models/Product')
const productRoutes = require('./routes/productRoutes')

const PORT = process.env.PORT || 5000

// Connect to MongoDB database
connectDB()

const app = express()

app.use(express.json())

app.use(cors())

app.use('/api/products', productRoutes)

// Fetch Amazon Bestseller data every Friday at 4:00PM
cron.schedule('0 16 * * friday', () => {
  // set up the request parameters
  const params = {
    api_key: '8192BD0E167A40E0B5073B8F23FFF9E7',
    type: 'bestsellers',
    url: 'https://www.amazon.com/Best-Sellers-Electronics/zgbs/electronics/',
    output: 'json',
  }

  axios
    .get('https://api.rainforestapi.com/request', { params })
    .then((res) => {
      // Filter out the keys I don't want from response object
      const schemaObject = res.data.bestsellers.map((bestsellerObject) => {
        const filteredObject = {}
        // Only want 'title', 'image', and 'price' keys
        Object.keys(bestsellerObject).forEach((key) => {
          if (key == 'title' || key == 'image') {
            filteredObject[key] = bestsellerObject[key]
          } else if (key == 'price') {
            // 'price' is a nested object, need 'value' key
            filteredObject[key] = bestsellerObject[key].value.toFixed(2)
          }
        })
        // Sometimes items don't have listed prices, return them as undefined
        if (filteredObject.hasOwnProperty('price')) {
          return filteredObject
        }
      })

      // Filter out the undefined objects that didn't have prices
      const filteredSchemaObject = schemaObject.filter((object) => {
        return object != null
      })

      // Import data into our DB
      const importData = async () => {
        try {
          await Product.deleteMany({})

          // Omit the obvious Amazon sponsored products in top spots
          await Product.insertMany(filteredSchemaObject.slice(6))

          console.log('Data import SUCCESS')

          process.exit()
        } catch (error) {
          console.error('Error with data import', error)
          process.exit(1)
        }
      }

      importData()
    })
    .catch((error) => {
      console.log(error)
    })
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
