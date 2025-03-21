if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const Fitment = require('./models/fitment')

// Middleware to fetch fitments and add to res.locals
app.use(async (req, res, next) => {
    try {
        const fitments = await Fitment.find();
        res.locals.fitments = fitments;
    } catch (err) {
        res.locals.fitments = [];
    }
    next();
});

const indexRouter = require('./routes/index')
const searchRouter = require('./routes/search')
const productRouter = require('./routes/products')
const fitmentRouter = require('./routes/fitments')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { 
    useNewUrlParser: true})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))    

app.use('/', indexRouter)
app.use('/', searchRouter)
app.use('/products', productRouter)
app.use('/fitments', fitmentRouter)

// app.listen(3000)
app.listen(process.env.PORT || 3000)