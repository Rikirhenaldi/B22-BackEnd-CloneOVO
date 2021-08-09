const Sequelize = require('sequelize')
const sequelize = require('../config/sequelize')
const UserModels = require('./users')

const Transfers = sequelize.define('transfers', {
  userId: Sequelize.INTEGER,
  noRef: Sequelize.STRING,
  phoneRecepient: Sequelize.STRING,
  balance: Sequelize.INTEGER,
  description: Sequelize.STRING,
  trxFee: Sequelize.INTEGER,
})

Transfers.belongsTo(UserModels, {foreignKey: 'userId', sourceKey: 'id', as: 'userDetail'})

module.exports = Transfers