const express = require('express')
const router = express.Router()
const Fitment =  require('../models/fitment')

router.get('/', async (req, res) => {
    let fitments
    try {
        fitments = await Fitment.find()
    } catch  {
        fitments = []
    }
    res.render('index', {fitments: fitments})
})

module.exports = router