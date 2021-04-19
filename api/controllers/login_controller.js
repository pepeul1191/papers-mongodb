var express = require('express');
var router = express.Router();
var constants = require('../../config/constants')();
var helpers = require('../../config/helpers');
const { indexCss, indexJs } = require('../helpers/login_helper');

var index = (req, res, next) => {
  var locals = {
    constants: constants,
    title: 'Bienvenido',
    helpers: helpers,
    csss: indexCss(),
    jss: indexJs(),
    contents: {},
  };
  res.render('login/index', locals);
}

router.get('', index);
router.get('/sign-in', index);
router.get('/forgot-password', index);

module.exports = router; 
