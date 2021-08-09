const Sequelize = require('sequelize')
const sequelize = require('../config/sequelize')

const categories = sequelize.define('categories', {
  category: Sequelize.STRING
})

module.exports = categories