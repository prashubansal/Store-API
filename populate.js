// dynamically add the products in the db from products.json
require('dotenv').config()

const connectDB = require('./db/connect')
const Product = require('./models/product')

const jsonProducts = require('./products.json')

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        await Product.deleteMany()
        await Product.create(jsonProducts)
        console.log('Success!!!')
        // 0 => means everything goes well
        process.exit(0)
    } catch (error) {
        console.log(error); 
        process.exit(1)
    }
}

start()