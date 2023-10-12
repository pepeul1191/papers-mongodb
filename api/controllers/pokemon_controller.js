var express = require('express');
var router = express.Router();
const Pokemon = require('../models/pokemon');

router.get('/list', async (req, res, next) => {
  // data
  let generationId = (typeof req.query.name === 'undefined') ? 0 : req.query.generation_id ;
  // logic
  let query = {}
  if (generationId != 0){
    query.where = {
      generationId: generationId
    }
  }else{
    query.limit = 30
  }
  var list = await Pokemon.findAll(query);
  return res.send(JSON.stringify(list)).status(200);
});

module.exports = router;