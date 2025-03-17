const mongoose = require('mongoose')

const fitmentSchema = new mongoose.Schema({
    year: {
        type: Number,
        required: true
    },
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Fitment', fitmentSchema)