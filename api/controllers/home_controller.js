var express = require('express');
var router = express.Router();
var constants = require('../../config/constants')();
var helpers = require('../../config/helpers');
const { indexCss, indexJs } = require('../helpers/home_helper');

router.get('', function(req, res, next) {
  var locals = {
    constants: constants,
    title: 'Bienvenido',
    helpers: helpers,
    csss: indexCss(),
    jss: indexJs(),
    contents: {},
  };
  res.render('home/index', locals);
});

module.exports = router; 
