const auth = require('express').Router()
const authUserController = require('../controllers/auth')
const {checkSchema} = require("express-validator");

const validationRegister = require('../helpers/validationRegister')
const validationLogin =require('../helpers/validationLogin')
const validationLogin2 =require('../helpers/validationLogin2')
const authMidleware = require('../middlewares/auth')

auth.post('/register',checkSchema(validationRegister) , authUserController.registerUsers)
auth.post('/loginbynumber',checkSchema(validationLogin2) , authUserController.loginUserByNumber)
auth.post('/login',checkSchema(validationLogin) , authUserController.loginUser)
auth.post('/deviceRegisterToken', authMidleware, authUserController.deviceRegisterToken)

module.exports = auth