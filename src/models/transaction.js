const Sequelize = require('sequelize')
const sequelize = require('../config/sequelize')
const UserModels = require('./users')

const Transactions = sequelize.define('transactions', {
  userId: Sequelize.INTEGER,
  code: Sequelize.STRING,
  phoneNumber: Sequelize.STRING,
  products: Sequelize.STRING,
  categoryProducts: Sequelize.STRING,
  priceOfProduct: Sequelize.INTEGER,
  tax: Sequelize.INTEGER,
})

Transactions.belongsTo(UserModels, {foreignKey: 'userId', sourceKey: 'id', as: 'userDetail'})

module.exports = Transactions