const express = require('express')

exports.mainView = function (req, res) {
    res.render('Class')
};

exports.teacherClassView = function (req, res) {
    res.render('TeacherClass')
};