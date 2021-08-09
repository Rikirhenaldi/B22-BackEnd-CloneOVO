const productCategory = require('express').Router()
const productCategoryController = require('../controllers/productCategory')



productCategory.post("/:id", productCategoryController.createProductCategory)
productCategory.get("/:id", productCategoryController.getProductByCategory)


module.exports = productCategory