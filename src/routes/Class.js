const express = require('express'), app = express.Router()
const classFunc = require('../controllers/Class')

app.get('/class', classFunc.mainView);

app.get('/class/teachers', classFunc.teacherClassView)

module.exports = app