var express = require('express');
var db = require('../../config/database');
const User = require('../models/user');
const ExerciseMember = require('../models/exercise_member');
const Exercise = require('../models/exercise');
var router = express.Router();

router.get('/exercises_body_parts', (req, res, next) => {
  const memberId = req.query.member_id;
  const sqlQuery = `
    SELECT E.body_part_id, COUNT(E.body_part_id) AS body_parts
    FROM exercises_members EM
    INNER JOIN exercises E ON E.id = EM.exercise_id
    WHERE EM.member_id = ${memberId}
    GROUP BY E.body_part_id;
  `;
  db.query(sqlQuery, { type: db.QueryTypes.SELECT })
    .then(list=> {
      if (list) {
        var countExercises = 0
        list.forEach((item) => {
          countExercises = countExercises + item.body_parts
        });
        var response = {exercises: countExercises, body_parts: list.length};
        res.send(JSON.stringify(response)).status(200);
      } else {
        res.send('Lista no encontrada').status(404);
      }
    }).catch(err => {
      console.error('Error al realizar la consulta:', err);
      res.send(JSON.stringify(err)).status(501);
    });
});

router.get('/body_parts', (req, res, next) => {
  const memberId = req.query.member_id;
  const sqlQuery = `
    SELECT body_part_id AS id, body_part_name AS name FROM(
      SELECT EM.exercise_id, E.body_part_id, BP.name AS body_part_name FROM exercises_members EM 
      INNER JOIN exercises E ON E.id = EM.exercise_id 
      INNER JOIN body_parts BP ON BP.id = E.body_part_id
      WHERE member_id = ${memberId} ORDER BY body_part_id
    ) GROUP BY body_part_id;
  `;
  db.query(sqlQuery, { type: db.QueryTypes.SELECT })
    .then(list=> {
      if (list) {
        res.send(JSON.stringify(list)).status(200);
      } else {
        res.send('Lista no encontrada').status(404);
      }
    }).catch(err => {
      console.error('Error al realizar la consulta:', err);
      res.send(JSON.stringify(err)).status(501);
    });
});

router.get('/exercises', (req, res, next) => {
  var memberId = req.query.member_id;
  var bodyPartId = req.query.body_part_id;
  var sqlQuery = `
    SELECT E.id, E.name, E.image_url, E.video_url, E.description, E.body_part_id, EM.sets, EM.reps FROM exercises_members EM 
    INNER JOIN exercises E ON E.id = EM.exercise_id 
    INNER JOIN body_parts BP ON BP.id = E.body_part_id
    WHERE member_id = ${memberId}`;
  if(bodyPartId != null){
    sqlQuery = sqlQuery + ` AND body_part_id = ${bodyPartId};`;
  }else{
    sqlQuery = sqlQuery + `;`;
  }
  db.query(sqlQuery, { type: db.QueryTypes.SELECT })
    .then(list=> {
      if (list) {
        res.send(JSON.stringify(list)).status(200);
      } else {
        res.send('Lista no encontrada').status(404);
      }
    }).catch(err => {
      console.error('Error al realizar la consulta:', err);
      res.send(JSON.stringify(err)).status(501);
    });
});

router.get('/exercise', (req, res, next) => {
  var memberId = req.query.member_id;
  var exerciseId = req.query.exercise_id;
  var sqlQuery = `
    SELECT E.id, E.name, E.image_url, E.video_url, E.description, EM.reps, EM.sets 
    FROM exercises E INNER JOIN exercises_members EM ON E.id = EM.id
    WHERE EM.member_id = ${memberId} AND EM.exercise_id = ${exerciseId};`;
  db.query(sqlQuery, { type: db.QueryTypes.SELECT })
    .then(list=> {
      if (list) {
        res.send(JSON.stringify(list[0])).status(200);
      } else {
        res.send('Lista no encontrada').status(404);
      }
    }).catch(err => {
      console.error('Error al realizar la consulta:', err);
      res.send(JSON.stringify(err)).status(501);
    });
});

router.get('/profile', (req, res, next) => {
  var userId = req.query.user_id;
  var sqlQuery = `
    SELECT U.id AS user_id, U.user, M.names, M.last_names, M.phone, M.email, L.name AS level_name 
    FROM users U INNER JOIN members M ON U.member_id = M.id 
    INNER JOIN levels L ON L.id = M.level_id WHERE U.id = ${userId};`;
  db.query(sqlQuery, { type: db.QueryTypes.SELECT })
    .then(list=> {
      if (list) {
        res.send(JSON.stringify(list[0])).status(200);
      } else {
        res.send('Lista no encontrada').status(404);
      }
    }).catch(err => {
      console.error('Error al realizar la consulta:', err);
      res.send(JSON.stringify(err)).status(501);
    });
});


module.exports = router;
