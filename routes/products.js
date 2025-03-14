const express = require('express')
const router = express.Router()

router.use(logger)

router.get('/', (req, res) => {
    req.query.title
    res.send('Product List')
})
  
router.get('/new', (req, res) => {
  res.render("products/new")
})

router.post('/', (req, res) => {
    const isValid = true
    if (isValid) {
        products.push({ title: req.body.title })
        res.redirect(`/products/${products.length - 1}`)
    } else {
        console.log("Error")
        res.render('products/new', { title: req.body.title })
    }
})

router.route("/:id")
    .get((req, res) => {
        res.send(`Get products with ${req.params.id}`)
    })
    .put((req, res) => {
        res.send(`Update products with ${req.params.id}`)
    })
    .delete((req, res) => {
        res.send(`Delete products with ${req.params.id}`)
    })

const products = [{ name: "Radio"}, { name: "Speaker"}]

router.param("id", (req, res, next, id) => {
    req.product = products[id]
    next()
})

function logger(req, res, next){
    console.log(req.originalUrl)
    next()
  }

module.exports = router