const Sequelize = require('sequelize')
const sequelize = require('../config/sequelize')
const UserModels = require('./users')

const tokenFcm = sequelize.define('tokenFcm', {
  userId: Sequelize.INTEGER,
  deviceToken: Sequelize.STRING,
})

tokenFcm.belongsTo(UserModels, {foreignKey: 'userId', sourceKey: 'id'})

module.exports = tokenFcm