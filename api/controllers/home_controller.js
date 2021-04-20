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
    session: req.session,
    jss: indexJs(),
    contents: {},
  };
  res.status(200).render('home/index', locals);
});

//router.get('/profile', middlewares.sessionTrue(), function(req, res, next) {
router.get('/profile', (req, res, next) => {
  body = 'Usuario: ' + req.session.user + '<br>' +
    'Estado: ' + req.session.state + '<br>' +
    'Momento: ' + req.session.time;
  res.status(200).send(body);
});

//router.get('/sign-out', middlewares.sessionTrue(), function(req, res, next) {
router.get('/sign-out', (req, res, next) => {
  req.session = null;
  res.redirect('/');
});

module.exports = router; 
