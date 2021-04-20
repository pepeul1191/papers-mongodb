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

module.exports = router; 
