var express = require('express');
const { Op } = require("sequelize");
var router = express.Router();
var constants = require('../../config/constants')();
var helpers = require('../../config/helpers');
const User = require('../models/user');
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

router.get('', index);
router.get('/sign-in', index);
router.get('/forgot-password', index);

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

module.exports = router; 
