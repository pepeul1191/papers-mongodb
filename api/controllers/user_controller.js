var express = require('express');
const { stringify } = require('query-string');
var router = express.Router();
const User = require('../models/user');
const Member = require('../models/member');
const { Op } = require('sequelize');

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

router.post('/reset_password', (req, res, next) => {
  var dni = req.body.dni;
  var email = req.body.email;
  var response = {
    success: false,
    message: '',
    data: ''
  }
  var status = 404;
  Member.findOne({
    where: { 
      dni: dni,
      email: email
    }
  }).then(user => {
    if (user) {
      response.success = true;
      response.message = 'Se ha enviando un correo para cambiar de contraseña';
      response.data = 'Miembro encontrado';
      status = 200;
    } else {
      response.message = 'Miembro no encontrado';
    }
    res.send(JSON.stringify(response)).status(status);
  }).catch(err => {
    console.error('Error al realizar la consulta:', err);
    response.message = 'Error en encontrar al miembro';
    response.data = err;
    res.send(JSON.stringify(response)).status(501);
  });
});

router.post('/create', (req, res, next) => {
  var dni = req.body.dni;
  var email = req.body.email;
  var response = {
    success: false,
    message: '',
    data: ''
  }
  var status = 404;
  Member.findOne({
    where: { 
      [Op.or]: [
        {dni: dni},
        {email: email}
      ]
    }
  }).then(user => {
    if (user) {
      response.message = 'Correo y/o DNI en uso';
    } else {
      response.success = true;
      response.message = 'Se ha enviando un correo para activar su cuenta';
      response.data = 'Usuario creado';
      status = 200;
    }
    res.send(JSON.stringify(response)).status(status);
  }).catch(err => {
    console.error('Error al realizar la consulta:', err);
    response.message = 'Error en encontrar al miembro';
    response.data = err;
    res.send(JSON.stringify(response)).status(501);
  });
});

module.exports = router;
