const transactionModels = require('../models/transaction')
const userModels = require('../models/users')
const {date} = require('../helpers/date')

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