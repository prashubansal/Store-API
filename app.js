require('dotenv').config()
// async errors
require('express-async-errors')

const express = require('express')
const app = express()

const connectDB = require('./db/connect')
const productsRouter = require('./routes/products')

const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')

// middleware
app.use(express.json())

// routes
// home route
app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>')
})

// products route
app.use('/api/v1/products', productsRouter)


app.use(notFoundMiddleware)
app.use(errorMiddleware)



// connection to database, after that
// start the server 
const port = process.env.PORT || 3000

const start = async () => {
    try {
        // connectDB 
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on port ${port}...`))
    } catch (error) {
        console.log(error);
    }
}

start()