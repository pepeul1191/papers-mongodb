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
  res.status(200).render('home/demo', locals);
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

router.get('/about', (req, res, next) => {
  var group = [
    {codigo: 20051191, nombre: 'Pepe Valdivia'},
    {codigo: 20071191, nombre: 'Yacky Ramirez'},
    {codigo: 20161191, nombre: 'Sila Esculapia'},
    {codigo: 20231191, nombre: 'Chicle Pinkerton'},
  ];
  res.status(200).send(JSON.stringify(group));
});


router.get('/demo/', (req, res, next) => {
  console.log('XD')
  req.session = null;
  res.redirect('/');
});

module.exports = router; 
