import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import {notFound} from './middleware/errorMiddleware.js'
import {errorHandler} from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'





//routes
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'


dotenv.config()

connectDB()
const app =express();

app.use(express.json())

if(process.env.NODE_ENV ==='development'){
    app.use(morgan('dev'))
}

// app.get('/',(req,res)=>{
//     res.send(`API is running...`)

// })


app.use('/api/products',productRoutes)

app.use('/api/users',userRoutes)

app.use('/api/orders',orderRoutes)
app.use('/api/upload',uploadRoutes)



app.get('/api/config/paypal',(req,res)=>res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname=path.resolve()
app.use('/uploads',express.static(path.join(__dirname,'/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/ecm-frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'ecm-frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use(notFound)
app.use(errorHandler)




const PORT= process.env.PORT || 5000

app.listen(PORT,console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`))