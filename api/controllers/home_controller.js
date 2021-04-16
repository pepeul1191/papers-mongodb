var express = require('express');
var router = express.Router();

var path = '';

router.get(`/${path}`, function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router; 
