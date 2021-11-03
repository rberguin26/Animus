const express = require('express'), app = express.Router()
const registerFun = require('../controllers/Register')

app.get('/register', registerFun.mainView);

app.post('/register', registerFun.registerUser)

module.exports = app