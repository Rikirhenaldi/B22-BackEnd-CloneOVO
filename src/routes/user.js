const user = require('express').Router()
const authUserController = require('../controllers/users')
const transactionController = require('../controllers/transactions')
const picture = require('../middlewares/upload').single('picture')
const {checkSchema} = require("express-validator");

const validationLogin =require('../helpers/validationLogin3')

user.post('/transactions', transactionController.createTransactions)
user.post('/loginpin', checkSchema(validationLogin), authUserController.loginPin)
user.put('/editprofile', picture, authUserController.updateUser)
user.delete('/delete/:id', picture, authUserController.deleteUserById)
user.get('/profile', picture, authUserController.detailUserProfile)
user.patch('/topup', authUserController.topUpBalanceUser)
user.patch('/transfer', authUserController.transferBalance)
user.get('/:id', authUserController.getDetailUserByIdParams)
user.get('/', authUserController.listUsers)

module.exports = user