var express = require('express');
var router = express.Router();
var constants = require('../../config/constants')();
var helpers = require('../../config/helpers');
const sessionTrue = require('../middlewares/session_true');
const { indexCss, indexJs } = require('../helpers/admin_helper');

router.get('/', sessionTrue, (req, res, next) => {
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
  res.status(200).render('admin/index', locals);
});

module.exports = router; 
