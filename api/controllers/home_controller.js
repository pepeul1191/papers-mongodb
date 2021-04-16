var express = require('express');
var router = express.Router();
var constants = require('../../config/constants');

router.get('', function(req, res, next) {
  console.log(constants())
  res.render('home/index', { title: 'Express' });
});

module.exports = router; 
