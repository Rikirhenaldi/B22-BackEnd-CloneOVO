const productModels = require('../models/products')
const {Op} = require('sequelize')

exports.createProducts = async (req, res) => {
  const {picture, productName, price, promoPrice, categoryId, quantity } = req.body

    if(productName.length > 15){
      return res.json({
        success: false,
        message: "Product Name to Long"
      })
    }

  const data = {
  picture: picture,
  productName: productName,
  price: price,
  promoPrice: promoPrice,
  categoryId: categoryId,
  quantity: quantity,
  }

  const resultProduct = await productModels.create(data)
  try{
    return res.json({
      success: true,
      message : "Product Created Succesfully",
      results: resultProduct,
    })
  }catch(err){
    return res.json({
      success: false,
      message: 'internal Server Erorrs',
      error: err,
    })
  }
}

exports.getProductByCategoryId = async (req, res) => {
  const {id} = req.params
  try{
    const data = await productModels.findAll({
      where : {
        categoryId: {
         [Op.substring] : id
        }
      }
    })
    return res.json({
      success: true,
      message: `List Product of category id: ${id} `,
      results: data
    })
  }catch(err){
    return res.json({
      success: false,
      message: `product not found`,
      results: err
    })
  }
}