var express = require('express');
var router = express.Router();
var constants = require('../../config/constants')();
var helpers = require('../../config/helpers');
const { indexCss, indexJs } = require('../helpers/carrer_helper');
const Carrer = require('../models/carrer');

router.get('', async (req, res, next) => {
  // logic
  var carrers = await Carrer.findAll({});
  // response
  var locals = {
    constants: constants,
    title: 'Bienvenido',
    helpers: helpers,
    csss: indexCss(),
    session: req.session,
    carrers: carrers,
    jss: indexJs(),
    contents: {},
  };
  res.status(200).render('carrer/index', locals);
});

router.get('/add', (req, res, next) => {
  // logic
  var formTitle = 'Agregar Carrera';
  // response
  var locals = {
    constants: constants,
    title: 'Bienvenido',
    helpers: helpers,
    csss: indexCss(),
    session: req.session,
    formTitle: formTitle,
    action: 'add',
    jss: indexJs(),
    contents: {},
  };
  res.status(200).render('carrer/detail', locals);
});

router.post('/add', async (req, res, next) => {
  // data
  var name = req.body.name;
  // logic
  try{
    await Carrer.create({
      name: name,
    }); 
  }catch(error){
    console.log(error);
    return res.redirect('/carrer?prev=add-error');
  } 
  // response
  return res.redirect('/carrer?prev=add-ok');
});

router.get('/edit/:id', async (req, res, next) => {
  // logic
  var formTitle = 'Editar Carrera';
  // response
  var locals = {
    constants: constants,
    title: 'Bienvenido',
    helpers: helpers,
    csss: indexCss(),
    session: req.session,
    formTitle: formTitle,
    action: 'edit',
    jss: indexJs(),
    contents: {},
  };
  res.status(200).render('carrer/detail', locals);
});

module.exports = router; 
