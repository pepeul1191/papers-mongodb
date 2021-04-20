var express = require('express');
var router = express.Router();
var constants = require('../../config/constants')();
var helpers = require('../../config/helpers');
const { indexCss, indexJs } = require('../helpers/home_helper');

router.get('', (req, res, next) => {
  // response
  var locals = {
    constants: constants,
    title: 'Bienvenido',
    helpers: helpers,
    csss: indexCss(),
    jss: indexJs(),
    contents: {},
  };
  res.status(200).render('home/index', locals);
});

//router.get('/user', middlewares.sessionTrue(), function(req, res, next) {
router.get('/user', (req, res, next) => {
  body = 'Usuario: ' + req.session.user + '<br>' +
    'Estado: ' + req.session.state + '<br>' +
    'Momento: ' + req.session.time;
  res.status(200).send(body);
});

//router.get('/close', middlewares.sessionTrue(), function(req, res, next) {
router.get('/exit', (req, res, next) => {
  req.session = null;
  res.redirect('/login');
});

module.exports = router; 
