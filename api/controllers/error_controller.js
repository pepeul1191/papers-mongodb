var express = require('express');
var router = express.Router();
var constants = require('../../config/constants')();
var helpers = require('../../config/helpers');
const { getContent, getTitle } = require('../../config/contents');
const { accessCss, accessJs } = require('../helpers/error_helper');

router.get('/access/:num', function(req, res, next) {
  var status = 404;
  var errorNumber = req.params.num;
  var registeredErrors = ['404', '5051']
  var lang = 'sp';
  // check if error content is not registered then, default error 404
  if (registeredErrors.indexOf(errorNumber) == -1){
    errorNumber = '404'
  }
  var locals = {
    constants: constants,
    title: getTitle()[lang]['error'],
    helpers: helpers,
    csss: accessCss(),
    jss: accessJs(),
    contents: getContent('error')[lang][errorNumber],
    lang: lang,
  };
  res.render('error/access', locals);
});

module.exports = router; 
