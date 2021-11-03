const express = require('express'), app = express.Router()

app.get('/inst', (req, res) => {
    res.render('Inst')
})

app.get('/teacherinst', (req, res) => {
    res.render('TeacherInst')
})

module.exports = app