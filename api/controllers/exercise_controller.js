var express = require('express');
const Exercise = require('../models/exercise');
var router = express.Router();

router.get('/list', (req, res, next) => {
  const bodyPartId = req.query.body_part_id;
  var where = {}
  if(bodyPartId != null){
    where = {
      where: {
        body_part_id: bodyPartId
      }
    }
  }
  Exercise.findAll(where)
    .then(list => {
      if (list) {
        res.send(JSON.stringify(list)).status(200);
      } else {
        res.send('Lista no encontrada').status(404);
      }
    })
    .catch(err => {
      console.error('Error al seleccionar los registros:', err);
    });
});

router.get('/find', (req, res, next) => {
  const exerciseId = req.query.exercise_id;
  Exercise.findOne({
    where: {
      id: exerciseId
    }
  })
    .then(record => {
      if (record) {
        res.send(JSON.stringify(record)).status(200);
      } else {
        res.send('Lista no encontrada').status(404);
      }
    })
    .catch(err => {
      console.error('Error al seleccionar los registros:', err);
    });
});

module.exports = router;
