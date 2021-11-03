const express = require('express'), app = express.Router()
const loginFunc = require('../controllers/Login')

app.get('/login', loginFunc.mainView)

app.post('/login', loginFunc.userLogin)

module.exports = app