'use strict'

const express = require('express')
const productControllers = require('../controllers')
const api = express.Router()

api.get('/product', productControllers.getProducts)
api.get('/product/:productId', productControllers.getProduct)
api.post('/product', productControllers.saveProduct)
api.put('/product/:productId', productControllers.updateProduct)
api.delete('/product/:productId', productControllers.deleteProduct)

module.exports = api
