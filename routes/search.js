const express = require('express')
const router = express.Router()
const Product = require('../models/product') 
const Fitment = require('../models/fitment')

router.get('/search', async (req, res) => {
    const { year, make, model } = req.query;
    try {
        // Find the fitment based on year, make, and model
        const fitment = await Fitment.findOne({ year, make, model })

        // Use the fitment params to find related products
        const products = await Product.find({ fitment: fitment._id })

        if (products.length === 0) {
            return res.send('No products found for this fitment')
        }
  
        res.render('search', { products })
    } catch {
        res.status(500).send('Error occurred while searching for products');
    }
})

module.exports = router;