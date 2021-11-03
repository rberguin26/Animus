const express = require('express'), app = express.Router()
const dataFunc = require('../controllers/Data')

app.get('/search', dataFunc.mainView)

app.get('/search/query', dataFunc.listTeachers);

app.get('/search/class', dataFunc.listClass);

app.get('/admin', dataFunc.adminView);

app.get('/delete', dataFunc.deleteVal);

app.get('/add', dataFunc.addClass);

app.get('/teacher/class', dataFunc.getTeacherByClass)

module.exports = app