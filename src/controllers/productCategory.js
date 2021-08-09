const productCategoryModels = require('../models/productsCategory')
const productModels = require('../models/products')
const {Op} = require('sequelize')

exports.createProductCategory = async (req, res) => {
  const {id} = req.params
  console.log(id);
  const product = await productModels.findByPk(id)
  try{
    const data = { productId : product.id, categoryId : req.body. categoryId}
    const resultProductCategory = await productCategoryModels.create(data)
    try{
      return res.json({
        success: true,
        message : "Product_Category populate Created Succesfully",
        results: resultProductCategory,
      })
    }catch(err){
      return res.json({
        success: false,
        message: 'internal Server Erorrs',
        error: err,
      })
    }
 }catch(err){
   console.log(err);
   return res.json({
    success: false,
    message: 'Product Not Found',
    error: err,
   })
 }
}

exports.getProductByCategory = async (req, res) => {
  const {id} = req.params
  const data = await productCategoryModels.findAll({
    where : {
      categoryId: {
       [Op.substring] : id
      }
    }
  })
  try{
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