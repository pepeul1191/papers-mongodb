var express = require('express');
var router = express.Router();
var constants = require('../../config/constants')();
var helpers = require('../../config/helpers');
const sessionTrue = require('../middlewares/session_true');
const { indexCss, indexJs, prevMessage } = require('../helpers/carrer_helper');
const Carrer = require('../models/carrer');

router.get('', sessionTrue, async (req, res, next) => {
  // logic
  var carrers = await Carrer.findAll({});
  var prev = req.query.prev;
  // response
  var locals = {
    constants: constants,
    title: 'Bienvenido',
    helpers: helpers,
    csss: indexCss(),
    session: req.session,
    prevMessage: prevMessage(prev),
    carrers: carrers,
    jss: indexJs(),
    contents: {},
  };
  res.status(200).render('carrer/index', locals);
});

router.get('/add', (req, res, next) => {
  // logic
  var formTitle = 'Agregar Carrera';
  var carrer = {
    id: 'E',
    name: '',
  };
  // response
  var locals = {
    constants: constants,
    title: 'Bienvenido',
    helpers: helpers,
    csss: indexCss(),
    session: req.session,
    formTitle: formTitle,
    carrer: carrer,
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
  var carrer = null;
  try{
    carrer = await Carrer.findOne({
      where: {
        id: req.params.id,
      }
    });
    // console.log(carrer)
  }catch(error){
    console.log(error);
  }
  if(carrer == null){
    return res.redirect('/error/access/404');
  }
  // response
  var locals = {
    constants: constants,
    title: 'Bienvenido',
    helpers: helpers,
    csss: indexCss(),
    session: req.session,
    formTitle: formTitle,
    action: 'edit',
    carrer: carrer,
    jss: indexJs(),
    contents: {},
  };
  res.status(200).render('carrer/detail', locals);
});

router.post('/edit', async (req, res, next) => {
  // data
  var id = req.body.id;
  var name = req.body.name;
  // logic
  try{
    await Carrer.update({
      name: name,
    }, {
      where: {
        id: id  
      }
    });
  }catch(error){
    console.log(error);
    return res.redirect('/carrer?prev=edit-error');
  } 
  // response
  return res.redirect('/carrer?prev=edit-ok');
});

router.get('/delete', async (req, res, next) => {
  // data
  var id = req.query.id;
  // logic
  try{
    carrer = await Carrer.findOne({
      where: {
        id: id,
      }
    });
    if(carrer == null){
      return res.redirect('/error/access/404');
    }
    await carrer.destroy();
  }catch(error){
    console.log(error);
    return res.redirect('/carrer?prev=delete-error');
  } 
  // response
  return res.redirect('/carrer?prev=delete-ok');
});

module.exports = router; 
