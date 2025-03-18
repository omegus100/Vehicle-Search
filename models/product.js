const mongoose = require('mongoose')
const path = require('path')
const productImageBasePath = 'uploads/productCovers'

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    productImageName: {
        type: String
    },
    fitment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Fitment',
        required: true
    }
})

productSchema.virtual('coverImagePath').get(function() {
    if (this.productImageName != null) {
        return path.join('/', productImageBasePath, this.productImageName)
    }
})

module.exports = mongoose.model('Product', productSchema)
module.exports.productImageBasePath = productImageBasePath