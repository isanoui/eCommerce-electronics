// To load variables from .env file into process.env
require('dotenv').config()

const mongoose = require('mongoose')

// async because we will need to wait for DB response
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log('MongDB connection SUCCESS')
  } catch (error) {
    console.error('MongoDB connection FAILED: ', error)
    process.exit(1)
  }
}

// To call this function elsewhere
module.exports = connectDB
