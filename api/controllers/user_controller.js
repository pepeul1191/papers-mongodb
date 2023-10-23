var express = require('express');
const { stringify } = require('query-string');
var router = express.Router();
const User = require('../models/user');

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.post('/validate', (req, res, next) => {
  var user = req.body.user;
  var password = req.body.password;
  var response = {
    success: false,
    message: '',
    data: ''
  }
  var status = 404;
  User.findOne({
    where: { 
      user: user,
      password: password
    }
  }).then(user => {
    if (user) {
      response.success = true;
      response.message = 'Usuario encontrado';
      response.data = JSON.stringify({
        user_id: user.id, 
        member_id: user.member_id
      });
      status = 200;
    } else {
      response.message = 'Usuario no encontrado';
    }
    res.send(JSON.stringify(response)).status(status);
  }).catch(err => {
    console.error('Error al realizar la consulta:', err);
    response.message = 'Error en encontrar al usuario';
    response.data = err;
    res.send(JSON.stringify(response)).status(501);
  });
});

module.exports = router;
