const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const Product = require('../models/product')
const Fitment = require('../models/fitment')
const product = require('../models/product')
const { search } = require('./fitments')
const uploadPath = path.join('public', Product.productImageBasePath)
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif']
const upload = multer({ 
    dest: uploadPath, 
    fileFilter: (req, file, callback) => {
        callback(null, true) 
    }
})

// All Products Route - Incomplete
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({})
        res.render('products/index', { 
            products: products,
            searchOptions: req.query
        })
    } catch (error) {
        res.redirect('/')
    }
    // req.query.title
  
})

// New Product Route  - Incomplete 
router.get('/new', async (req, res) => {
  renderNewPage(res, new Product())
})

// Create Product Route - Incomplete
router.post('/', upload.single('image'), async (req, res) => {
    const fileName = req.file != null ? req.file.filename : null
    const product = new Product({
        title: req.body.title,
        price: req.body.price,
        productImageName: fileName,
        fitment: req.body.fitment
    })

    try {
        const newProduct = await product.save()
        res.redirect(`products`)
        // res.redirect(`products/${newProduct.id}`)
    } catch (error) {
        if (product.productImageName != null) {
            removeProductImage(product.productImageName)
        }
        renderNewPage(res, product, true)
    }
})

async function renderNewPage(res, product, hasError = false) {
    try {
        const fitments = await Fitment.find({})
        const params = {
            fitments: fitments,
            product: product
        }
        if (hasError) params.errorMessage = 'Error Creating Product'
        res.render('products/new', params)
    } catch  {
        res.redirect('/products')
    }
    // renderFormPage(res, product, 'new', hasError)
}

function removeProductImage(fileName) {
    fs.unlink(path.join(uploadPath, fileName), err => {
        if (err) console.error(err)
    })
}

function saveCover(product, productImageEncoded) {
    if (productImageEncoded == null) return
    const productImage = JSON.parse(productImageEncoded)
    if (productImage != null) {
        product.productImage = new Buffer.from(productImage.data, 'base64')
        product.productImageType = productImage.type
    }
}

module.exports = router