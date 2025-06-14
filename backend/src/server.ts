import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import userRoutes from './routes/user'
import superUserRoutes from './routes/superuser'
import productRoutes from './routes/product'
import orderRoutes from './routes/order'

mongoose.connect('mongodb://localhost:27017/sushivery').then(() => {
  console.log('conectado a la base de datos')
}).catch((err) => {
  console.error(err)
})

dotenv.config()
const app = express()

const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(
  {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    // credentials: true,
  }
))

app.use('/api/users', userRoutes)
app.use('/api/superusers', superUserRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)

app.listen(PORT, () => {
  console.log(`servidor corriendo en http://localhost:${PORT}`)
})
