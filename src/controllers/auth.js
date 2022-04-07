const UserModels = require('../models/users')
const { validationResult } = require("express-validator");
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt");
const {Op} = require('sequelize')

exports.loginUser = async (req, res) => {
  try{
    const errors = validationResult(req)
    const {phone, pin} = req.body
    if(!errors.isEmpty()){
      return res.status(400).json({ message: errors.array()[0].msg });
    }else{
      const result = await UserModels.findAll({
        where: {
          phone: {
           [Op.substring] : req.body.phone
          }
        }
      })
      const user = result[0]
      const compare = await bcrypt.compare(pin, user.pin)
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

exports.loginUserByNumber = async (req, res) => {
  try{
    const errors = validationResult(req)
    const {phone} = req.body
    if(!errors.isEmpty()){
      return res.status(400).json({ message: errors.array()[0].msg });
    }else{
      const result = await UserModels.findAll({
        where: {
          phone: req.body.phone
        }
      })
      if(result){
      const user = result[0]
      const token = jwt.sign({id: user.id, phone: user.phone}, process.env.APP_KEY)
      return res.json({
        success: true,
        message: 'Login Success',
        token: token
      })
      }else{
        return res.json({
          success: false,
          message: 'Your Number Not Yet Register'
        })
      }
    }
  }catch(err){
    console.log(err);
    return res.json({
      success: false,
      message: 'Your Number Not Yet Register',
    })
  }
}

exports.registerUsers = async (req, res) => {
  try{
    const errors = validationResult(req);
    const data = req.body;
    if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array()[0].msg });
    }else{
        const findUser = await UserModels.findAll({
          where : {
            phone: data.phone
          }
        })
        if(findUser.length >= 1){
          return res.status(402).json({
            success: false,
            message: 'Phone number is already in use'
          })
        }else{
          data.pin = await bcrypt.hash(data.pin, await bcrypt.genSalt());
        const user = await UserModels.create(data)
        const finaldata = {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          picture: user.picture,
          balance: user.balance + 0
        }
          return res.json({
            success: true,
            message: 'register succesfully',
            results: finaldata,
          })
        }
      }
  }catch(err){
    return res.json({
      success: false,
      message: 'register failed',
      results: err
    })
  }
};

