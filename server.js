const express = require('express')
const app = express()

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set('view engine', 'ejs')

const productRouter = require('./routes/products')

app.use('/products', productRouter)

app.listen(3000)