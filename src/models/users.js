const Sequelize = require('sequelize')
const sequelize = require('../config/sequelize')

const Users = sequelize.define('users', {
  picture: Sequelize.STRING,
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  pin: Sequelize.STRING,
  balance: Sequelize.INTEGER,
  phone: Sequelize.STRING,
})

module.exports = Users