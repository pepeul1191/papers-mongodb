var express = require('express');
var router = express.Router();
const Pokemon = require('../models/pokemon');

router.get('/list', async (req, res, next) => {
  var list = await Pokemon.findAll({
    limit: 20
  });
  return res.send(JSON.stringify(list)).status(200);
});

module.exports = router;