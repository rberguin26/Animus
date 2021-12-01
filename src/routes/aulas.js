const express = require('express'), app = express.Router()
const aulasFunc = require('../controllers/aulas')

app.get('/aulas', aulasFunc.mainView);

module.exports = app