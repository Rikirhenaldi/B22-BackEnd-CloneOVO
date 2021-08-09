const Sequelize = require('sequelize')
const sequelize = require('../config/sequelize')
const ProductsCategory = require('./category')

const Products = sequelize.define('products', {
  picture: Sequelize.STRING,
  productName: Sequelize.STRING,
  price: Sequelize.INTEGER,
  promoPrice: Sequelize.INTEGER,
  categoryId: Sequelize.INTEGER,
  quantity: Sequelize.INTEGER,
})

module.exports = Products