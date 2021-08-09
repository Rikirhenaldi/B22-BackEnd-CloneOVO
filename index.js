require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const sequelize = require('./src/config/sequelize')
const rootRouter = require('./src/routes/index')
const bodyParser = require("body-parser");
const { APP_UPLOADS_ROUTE, APP_UPLOADS_PATH, PORT } = process.env;

app.use(bodyParser.urlencoded({extended: false}));

app.use(cors())
app.use(rootRouter)
app.use(APP_UPLOADS_ROUTE, express.static(APP_UPLOADS_PATH));


app.get('/', (req, res) => {
  const data = {
    succsess: true,
    message: 'Backend is running well'
  }
  return res.json(data)
})

app.listen(PORT, () => {
  console.log(`App runing on port ${PORT}`)
  sequelize.sync()
})
