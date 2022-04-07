const product = require('express').Router()
const productController = require('../controllers/products')



product.get("/detail/:id", productController.getDetailProductById)
product.post("/", productController.createProducts)
product.get("/:id", productController.getProductByCategoryId)


module.exports = product
