var express = require('express');
var router = express.Router();
var constants = require('../../config/constants')();
var helpers = require('../../config/helpers');

router.get('', (req, res, next) => {
  // response
  var locals = {
    constants: constants,
    title: 'Bienvenido',
    helpers: helpers,
    session: req.session,
    contents: {},
  };
  res.status(200).render('articles', locals);
});

module.exports = router; 
