const categoryModels = require('../models/category')

exports.createCategory = async (req, res) => {
  const data = { category : req.body.category}

  const resultCategory = await categoryModels.create(category)
  try{
    return res.json({
      success: true,
      message : "Category Product Created Succesfully",
      results: resultCategory,
    })
  }catch(err){
    return res.json({
      success: false,
      message: 'internal Server Erorrs',
      error: err,
    })
  }
}