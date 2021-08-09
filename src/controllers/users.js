const UserModels = require('../models/users')
const transfersModels = require('../models/transfer')
const {APP_UPLOADS_ROUTE, APP_URL} = process.env
const {date} = require('../helpers/date')
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const {Op} = require('sequelize')
const jwt = require('jsonwebtoken')


exports.updateUser = async (req, res) => {
    const user = await UserModels.findByPk(req.authUser.id)
    console.log(req.body);
    if(user){
        if(req.file){
          req.body.picture = req.file ? `${APP_UPLOADS_ROUTE}/${req.file.filename}` : null
          user.set(req.body)
          await user.save()
          const finaldata = {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            picture: user.picture,
            balance: user.balance
          }
          return res.json({
            success: true,
            message: 'User Updated Successfully',
            results: finaldata
          })
        }else{
          user.set(req.body)
          await user.save()
          console.log(req.body);
          const finaldata = {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            picture: user.picture,
            balance: user.balance
          }
          return res.status(200).json({
            success: true,
            Message: 'Profile updated successfully',
            results: finaldata
          })
        }
    }else{
      return res.status(400).json({
        success: false,
        Message: 'You must be login first'
      })
    }
}

exports.deleteUserById = async (req, res) => {
  const {id} = req.params
  const user = await UserModels.findByPk(id)
  await user.destroy()
  return res.json({
    success: true,
    message: 'Deleted User Succesfully',
    results: user
  })
 }

exports.listUsers = async (req, res) => {
  const user = await UserModels.findAll()
  return res.json({
    success: true,
    message: 'List of users',
    results: user
  })
}

exports.detailUserProfile = async (req, res) => {
  const user = await UserModels.findByPk(req.authUser.id)
  if(user){
    const finaldata = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      picture: user.picture,
      balance: user.balance
    }
    if (finaldata.picture !== null && !finaldata.picture.startsWith('http')) {
      finaldata.picture = `${APP_URL}${finaldata.picture}`
    }
    return res.json({
      success: true,
      message: 'detail user',
      results: finaldata
    })
  }else{
    return res.json({
      success: false,
      message: 'You Must be Login First'
    })
  }
}

exports.getDetailUserByIdParams = async (req, res) => {
  const {id} = req.params
  const user = await UserModels.findByPk(id)
  const finaldata = {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    picture: user.picture,
    balance: user.balance
  }
    return res.json({
      success: true,
      message: 'detail user',
      resutls: finaldata
    })
}

exports.topUpBalanceUser = async (req, res) => {
  const {amount} = req.body
  const user = await UserModels.findByPk(req.authUser.id)
  if(user){
    if(amount < 5000){
      return res.json({
        success: true,
        message: "Can't Top up Less than Rp.5.000"
      })
    }else{
      user.set({
        balance : user.balance + parseInt(amount)
      })
      await user.save()
      const paymentReceipt = {
        userId: user.id,
        noRef: "ID" + date(),
        phoneRecepient: user.phone,
        balance : amount,
        description : 'Top Up Balance' ,
      }
      const transfer = await transfersModels.create(paymentReceipt)
      return res.json({
        success: true,
        message: 'Top Up successfully',
        resutls: transfer,
        resultBalance: user.balance
      })
    }
  }else{
    return res.json({
      success: false,
      message: 'you must be login first'
    })
  }
}

exports.transferBalance = async (req, res) => {
  const {phone,amount} = req.body
  const user = await UserModels.findByPk(req.authUser.id)
  try{
    if(user){
      if(parseInt(amount) > parseInt(user.balance)){
        return res.json({
          success: true,
          message: "You dont have enought balance to transfers"
        })
      }else{
        if(parseInt(amount) < 5000){
          return res.json({
            success: true,
            message: "Can't Transfer Balance Less than Rp.5.000"
          })
        }else{
          const reciverUser = await UserModels.findOne({
            where: {
              phone: phone
            }
          })
          try{
              const paymentReceipt = {
                userId: user.id,
                noRef: "ID" + date(),
                phoneRecepient: user.phone,
                balance : amount,
                description : 'Transfer Balance',
                trxFee: 2000,
              }
              const transfer = await transfersModels.create(paymentReceipt)
              reciverUser.set({
                balance : reciverUser.balance + parseInt(amount)
              })
              await reciverUser.save()
              user.set({
                balance : user.balance - parseInt(amount) - 2000
              })
              await user.save()
              return res.json({
                success: true,
                message: 'Transfer Balance successfully',
                resutls: transfer,
                resultBalance: user.balance
              })
          }catch(err){
            console.log(err);
            return res.json({
              success: false,
              message: "Reciver User not Found"
            })
          }
        }
      }
    }else{
      return res.json({
        success: true,
        message: "Reciver User not Found"
      })
    }
  }catch(err){
    console.log(err);
  }
}


exports.loginPin = async (req, res) => {
  try{
    const errors = validationResult(req)
    const {pin} = req.body
    console.log(pin);
    if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array()[0].msg });
    }else{
      console.log('ini', req.authUser.id);
      const result = await UserModels.findByPk(req.authUser.id)
      const user = result
      const compare = await bcrypt.compare(req.body.pin, user.pin)
      if(compare){
        const token = jwt.sign({id: user.id, phone: user.phone}, process.env.APP_KEY)
        return res.json({
          success: true,
          message: 'Login Success',
          token: token
        })
      }else{
        return res.json({
          success: false,
          message: 'Login failed',
        })
      }
    }
  }catch(err){
    console.log(err);
    return res.json({
      success: false,
      message: 'Login failed',
      results: err
    })
  }
}
