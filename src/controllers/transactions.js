const transactionModels = require('../models/transaction')
const userModels = require('../models/users')
const {date} = require('../helpers/date')
const productModels = require('../models/products')
const {Op} = require('sequelize')

exports.createTransactions = async (req, res) => {
  const{product, price, categoryProduct, tax, phoneNumber} = req.body
  const user = await userModels.findByPk(req.authUser.id)
  try{
    if(user){
      if(user.balance < price){
        return res.json({
          success: false,
          message: 'Your Balance is not enough to Buy this Products'
        })
      }
      if(price < 0){
        return res.json({
          success: false,
          message: 'price errors cause the value less than 0'
        })
      }
      const paymentReceipt = {
        userId: user.id,
        code: "CS/" + date(),
        products: product,
        categoryProducts: categoryProduct,
        priceOfProduct: price,
        tax: tax,
        phoneNumber: phoneNumber,
      }
      const transaction = await transactionModels.create(paymentReceipt)
        try{
          await user.decrement('balance', { by: parseInt(price) + parseInt(tax) })
          return res.json({
            success:true,
            message: "Payment Successfully",
            results: transaction,
          })
        }catch(err){
          console.log(err);
        }
    }
  }catch(err){
    console.log(err);
  }
}


exports.createTransactionsByProduct = async (req, res) => {
  const{product, categoryProduct, tax, phoneNumber} = req.body
  const {id} = req.params
  try{
    const data = await productModels.findOne({
      where : {
        id: {
         [Op.substring] : id
        }
      }
    })
    // return console.log(data);
    if(data){
      const price = data.price
      const user = await userModels.findByPk(req.authUser.id)
      const priceAndTax = Number(data.price) + Number(tax)
    if(user){
      if(user.balance < priceAndTax){
        return res.status(402).json({
          success: false,
          message: 'Saldo anda tidak cukup untuk membeli Pulsa'
        })
      }
      if(price < 0){
        return res.status(402).json({
          success: false,
          message: 'price errors cause the value less than 0'
        })
      }
      if(data.quantity < 1){
        return res.status(402).json({
          success: false,
          message: 'Product ini Habis'
        })
      }
      const paymentReceipt = {
        userId: user.id,
        code: "CS/" + date(),
        products: product,
        categoryProducts: categoryProduct,
        priceOfProduct: price,
        tax: tax,
        phoneNumber: phoneNumber,
      }
      const transaction = await transactionModels.create(paymentReceipt)
        try{
          await user.decrement('balance', { by: parseInt(price) + parseInt(tax) })
          await data.decrement('quantity', { by: 1 })
          return res.json({
            success:true,
            message: "Pembayaran berhasil",
            results: transaction,
          })
        }catch(err){
          console.log(err);
          return res.json({
            success:false,
            message: "Payment gagal",
            results: err,
          })
        }
    }
  }else{
    return res.json({
      success: false,
      message: 'Product Not Found'
    })
  }
  }catch(err){
    console.log(err);
  }
}



exports.getTransactions = async (req, res) => {
  const {search} = req.query
  const user = await userModels.findByPk(req.authUser.id)
  try{
    const data = await transactionModels.findAll({
      where : {
        [Op.and]:[
          {userId : user.id},
          {products : {
            [Op.substring] : search
           }},
        ]
      }
    })
    if(search.length >= 1){
      if(data.length >= 1){
        return res.json({
          success: true,
          message: `Results History Payment Transaction By key ${search}`,
          results: data,
        }) 
      }else{
        return res.json({
          success:false,
          message: `Results History Payment with Key ${search} is not found`,
        })
      }
    }else{
      if(data.length >= 1){
        return res.json({
          success: true,
          message: "History Payment Transaction",
          results: data,
        }) 
      }else{
        return res.json({
          success:false,
          message: "History Payment Kosong",
        })
      }
    }
  }catch{
    return res.json({
      success:false,
      message: "You must be login first",
    })
  }
}