const express = require('express')
const router = express.Router()
const Fitment = require('../models/fitment')

// All Fitments Route
router.get('/', async (req, res) => {
    try {
        const fitments = await Fitment.find()
        res.render('fitments/index', { fitments: fitments })
    } catch  {
        res.redirect('/')
    }
})
  
// New Fitment Route
router.get('/new', (req, res) => {
    res.render('fitments/new', { fitment: new Fitment()})
})

// Create Fitment Route
router.post('/', async (req, res) => {
    const fitment = new Fitment({
        year: req.body.year,
        make: req.body.make,
        model: req.body.model
    })

    try {
        const newFitment = await fitment.save()
      //  res.redirect(`fitments/${newFitment.id}`)
        res.redirect(`fitments`)
    } catch {
        res.render('fitments/new', {
            fitment: fitment,
            errorMessage: 'Error creating Fitment'
          }) 
    }
})

module.exports = router