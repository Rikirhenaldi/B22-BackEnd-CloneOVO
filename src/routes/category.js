const category = require('express').Router()
const categoryController = require('../controllers/category')



category.post("/", categoryController.createCategory)


module.exports = category