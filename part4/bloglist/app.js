require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const middleware = require('./utils/middleware')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const config = require('./utils/config')

const app = express()

mongoose.set('strictQuery', false)

mongoose
  .connect(config.MONGODB_URI, {
    retryWrites: false,
  })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('Failed to connect MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.logger)
app.use(middleware.tokenExtractor)

if (process.env.NODE_ENV === 'dev') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use('/api/blogs', middleware.userExtractor, blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
