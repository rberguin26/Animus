const express = require('express'), app = express.Router();
const userFunc = require('../controllers/User')

app.get('/user', userFunc.mainView);

app.get('/list', userFunc.getList);

app.get('/userinfo', userFunc.getInfos);

module.exports = app