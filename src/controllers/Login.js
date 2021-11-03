const mongoose = require('mongoose');
const modelUser = mongoose.model('User');

const bcrypt = require('bcrypt')

exports.mainView = function (req, res) {
    res.render('Login')
  };

exports.userLogin = function (req, res) {
  modelUser.findOne({ 'email': req.body.email.toLowerCase() })

    .then((user) => {

      if (!user) res.send('Esse usuário não existe')

      let bool = bcrypt.compareSync(req.body.password, user.password);
      
      if (bool == false) res.render('Login', { erros: 'Senha Incorreta!'});  
      
      res.render('User', { logged: user.id});
  })
  .catch((err) => {
      res.render('Login', { erros: err});
  });
}