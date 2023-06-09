const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const router = require('./routes/index.js')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
dotenv.config()

app.use(cookieParser())
app.use(bodyParser.json())
app.use(express.json())
app.use(router)

app.listen(5000, () => {
    console.log('App listening on port 5000')
})