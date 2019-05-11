'use strict'
const Product = require('../models/product')

function getProduct(req, res) {
  let productId = req.params.productId

  Product.findById(productId, (err, product) => {
    if(err) return res.status(500).send({ message: `Error "${err}": bad request to database` })
    if(!product) return res.status(404).send({ message: `Error "${err}": Product ${productId} not found on database` })

    res.status(200).send({ product })
  })
}

function saveProduct(req, res) {
  console.log('POST /api/product')
  console.log(req.body)
  let product = new Product()
  product.name = req.body.name
  product.picture = req.body.picture
  product.price = req.body.price
  product.category = req.body.category
  product.description = req.body.description

  product.save((err, productStored) => {
    if(err) res.status(500).send({ message: `Error "${err}": product has not been stored properly into the database` })
    res.status(200).send({ product: productStored })
  })
}

function getProducts(req, res) {
  Product.find({}, (err, products) => {
    if(err) return res.status(500).send({ message: `Error "${err}": bad request to database` })
    if(!products) return res.status(404).send({ message: `Error "${err}": No products found on database` })

    res.status(200).send({ products })
  })
}

function updateProduct(req, res) {
  let productId = req.params.productId
  let update = req.body

  Product.findByIdAndUpdate(productId, update, (err, productUpdated) => {
    if(err) res.status(500).send({ message: `Error "${err}": failed on update your product` })

    res.status(200).send({ product: productUpdated })
  })
}

function deleteProduct(req, res) {
  let productId = req.params.productId

  Product.findById(productId, (err, product) => {
    if(err) return res.status(500).send({ message: `Error "${err}": fail to delete the product` })
    if(!product) return res.status(404).send({ message: `Error "${err}": Product ${productId} not found on database` })

    product.remove(err => {
      if(err) return res.status(500).send({ message: `Error "${err}": fail to delete the product` })
      res.status(200).send({ message: 'The product has been successfully deleted from database'})
    })
  })
}

module.exports = {
  getProduct,
  getProducts,
  saveProduct,
  updateProduct,
  deleteProduct
}
