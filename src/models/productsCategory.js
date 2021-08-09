const Sequelize = require('sequelize')
const sequelize = require('../config/sequelize')
const categories = require('./category')
const products = require('./products')

const ProductsCategory = sequelize.define('productCategories', {
  productId: Sequelize.INTEGER,
  categoryId: Sequelize.INTEGER,
})

ProductsCategory.belongsTo(categories, {foreignKey: 'categoryId', sourceKey: 'id'})
ProductsCategory.belongsTo(products, {foreignKey: 'productId', sourceKey: 'id'})

module.exports = ProductsCategory