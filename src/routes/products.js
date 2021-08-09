const product = require('express').Router()
const productController = require('../controllers/products')



product.post("/", productController.createProducts)
product.get("/:id", productController.getProductByCategoryId)

module.exports = product
