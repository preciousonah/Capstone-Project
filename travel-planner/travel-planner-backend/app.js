const morgan = require('morgan')
const express = require ('express')
const cors = require('cors')
const bodyParser = require('body-parser')


const app = express()

app.use(cors())
app.use(morgan('tiny'))
app.use(bodyParser.json())

module.exports = app
