var express = require('express');
const { Op } = require("sequelize");
var router = express.Router();
var constants = require('../../config/constants')();
var helpers = require('../../config/helpers');
const User = require('../models/user');
const sessionFalse = require('../middlewares/session_false');
const { indexCss, indexJs } = require('../helpers/login_helper');

// path = /login

var index = (req, res, next) => {
  // response
  var locals = {
    constants: constants,
    title: 'Bienvenido',
    helpers: helpers,
    csss: indexCss(),
    jss: indexJs(),
    message: '',
    messageColor: '',
    contents: {},
  };
  res.render('login/index', locals);
}

router.get('', sessionFalse, index);

router.post('/', async (req, res, next) => {
  // data
  var user = req.body.user;
  var password = req.body.password;
  var status = 200;
  var message = 'Usuario y/o contraseña no coinciden';
  // logic
  try{
    var exist = await User.count({
      where: {
        [Op.and]: [
          { user: user },
          { password: password },
        ]
      }
    });
    if(exist == 1){
      req.session.time = new Date().toLocaleTimeString();
      req.session.user = user;
      req.session.state = 'activate';
      res.redirect('/');
      res.end();
    }else{
      status = 500;
    }
  }catch(error){
    status = 500;
    message = 'Ocurrió un error en validad su usuario';
    console.log(error);
  }
  // response
  var locals = {
    constants: constants,
    title: 'Bienvenido',
    helpers: helpers,
    csss: indexCss(),
    jss: indexJs(),
    message: message,
    messageColor: 'text-danger',
    contents: {},
  };
  res.status(status).render('login/index', locals);
});

router.get('/sign-in', sessionFalse, index);

router.post('/sign-in', async (req, res, next) => {
  // data
  var user = req.body.user;
  var email = req.body.email;
  var password = req.body.password;
  var password2 = req.body.password2;
  var status = 200;
  var message = '';
  var messageColor = 'text-success';
  // logic
  if(password == password2){
    try{
      var exist = await User.count({
        where: {
          [Op.or]: [
            { user: user },
            { email: email },
          ]
        }
      });
      if(exist >= 1){
        status = 500;
        messageColor = 'text-danger';
        message = 'Usuario y/o correo ya registrados';
      }else{
        // create user
        var newStudent = await User.create({
          user: user,
          password: password,
          email: email,
          activationKey: helpers.randomSN(40),
          resetKey: helpers.randomSN(40),
        });  
        // send activation mail
        
      }
    }catch(error){
      status = 500;
      message = 'Ocurrió un error en validad su usuario';
      console.log(error);
    }
  }else{
    status = 500;
    message = 'Contraseñas no coinciden';
    messageColor = 'text-danger';
  }
  // response
  var locals = {
    constants: constants,
    title: 'Bienvenido',
    helpers: helpers,
    csss: indexCss(),
    jss: indexJs(),
    message: message,
    messageColor: messageColor,
    contents: {},
  };
  res.status(status).render('login/index', locals);
});

router.get('/forgot-password', sessionFalse, index);

module.exports = router; 
