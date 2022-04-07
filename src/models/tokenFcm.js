const Sequelize = require('sequelize')
const sequelize = require('../config/sequelize')
const UserModels = require('./users')

const TokenFCM = sequelize.define('tokenFcm', {
  userId: Sequelize.INTEGER,
  deviceToken: Sequelize.STRING,
})

TokenFCM.belongsTo(UserModels, {foreignKey: 'userId', sourceKey: 'id'})
UserModels.hasOne(TokenFCM)

module.exports = TokenFCM