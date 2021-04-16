var express = require('express');
var router = express.Router();
const Student = require('../models/student');

router.get('/list', async function(req, res, next) {
  var students = await Student.findAll({});
  return res.send(JSON.stringify(students));
});

module.exports = router;
