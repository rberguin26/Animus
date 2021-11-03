const express = require('express'), app = express.Router()
const homeFunc = require('../controllers/Home')

app.get('/', homeFunc.mainView);

module.exports = app