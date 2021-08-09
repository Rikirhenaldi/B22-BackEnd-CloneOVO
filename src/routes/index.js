const router = require('express').Router()
const authRouter = require('./auth')
const userRouter = require('./user')
const productRouter = require('./products')
const categoryRouter = require('./category')
const productCategoryRouter = require('./productCategory')
const auth = require('../middlewares/auth')

router.use('/auth', authRouter)
router.use('/users', auth, userRouter)
router.use('/products', auth, productRouter)
router.use('/category', auth, categoryRouter)
router.use('/productcategory', auth, productCategoryRouter)

module.exports = router