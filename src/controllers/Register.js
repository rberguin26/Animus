const mongoose = require('mongoose');
const modelUser = mongoose.model('User');

const bcrypt = require('bcrypt')

exports.mainView = function (req, res) {
  res.render('Register')
};

exports.registerUser = function (req, res) {
  modelUser.findOne({ 'username': req.body.username })
    .then(user => {
      if (user) {
        res.json({success: false, message: 'Esse nome de usuário não está disponível'});
      } else {
      bcrypt.hash(req.body.password, 10)
                .then(hash => {

                  let encryptedPassword = hash;

                  let newUser = new modelUser({
                      username: req.body.username,
                      photo: req.body.photo && req.body.photo != '' ? req.body.photo : '/IMG/Img.png',
                      email: req.body.email.toLowerCase(),
                      cell: req.body.phone,
                      password: encryptedPassword,
                      isTeacher: req.body.teacherCheck == 'on' ? true : false,
                      mainClass: req.body.classselector[0] || '',
                      secondClass: req.body.classselector[1] || ''
                  });

                  newUser.save()
                    .then(() => res.render('Login', {email: req.body.email}))
                    .catch((err) => res.json({ success: false, message: err, statusCode: 500}));
                })
                .catch(err => res.json({ success:false, message: err, statusCode: 500}));
      }
  })
}