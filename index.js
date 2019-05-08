'use strict'

const express = require('express')
const bodyParser = require('body-parser')

const mongoose = require('mongoose')
const Product = require('./models/product')

const app = express()
const port = process.env.PORT || 3001

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/api/product', (req, res) => {
  Product.find({}, (err, products) => {
    if(err) return res.status(500).send({ message: `Error "${err}": bad request to database` })
    if(!products) return res.status(404).send({ message: `Error "${err}": No products found on database` })

    res.status(200).send({ products })
  })
})

app.get('/api/product/:productId', (req, res) => {
  let productId = req.params.productId

  Product.findById(productId, (err, product) => {
    if(err) return res.status(500).send({ message: `Error "${err}": bad request to database` })
    if(!product) return res.status(404).send({ message: `Error "${err}": Product ${productId} not found on database` })

    res.status(200).send({ product })
  })
})

app.post('/api/product', (req, res) => {
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
})

app.put('/api/product/:productId', (req, res) => {
  let productId = req.params.productId
  let update = req.body

  Product.findByIdAndUpdate(productId, update, (err, productUpdated) => {
    if(err) res.status(500).send({ message: `Error "${err}": failed on update your product` })

    res.status(200).send({ product: productUpdated })
  })
})

app.delete('/api/product/:productId', (req, res) => {
  let productId = req.params.productId

  Product.findById(productId, (err, product) => {
    if(err) return res.status(500).send({ message: `Error "${err}": fail to delete the product` })
    if(!product) return res.status(404).send({ message: `Error "${err}": Product ${productId} not found on database` })

    product.remove(err => {
      if(err) return res.status(500).send({ message: `Error "${err}": fail to delete the product` })
      res.status(200).send({ message: 'The product has been successfully deleted from database'})
    })
  })
})

mongoose.connect('mongodb://localhost:27017/shop', { useNewUrlParser: true }, (err, res) => {
  if(err) {
    return console.log(`Error "${err}" while trying to connect to database, please check if your database is running`)
  }
  console.log('Conection to database stablished')

  app.listen(port, () => {
    console.log(`api rest running on http://localhost:${port}`)
  })
})