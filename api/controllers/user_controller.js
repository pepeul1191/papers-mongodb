var express = require('express');
var router = express.Router();
const User = require('../models/user');

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.post('/validate', (req, res, next) => {
  var user = req.body.user;
  var password = req.body.password;
  User.findOne({
    where: { 
      user: user,
      password: password
    }
  })
    .then(user => {
      if (user) {
        res.send(`${user.id}`).status(200);  
      } else {
        res.send('Usuario no encontrado').status(404);  
      }
    })
    .catch(err => {
      console.error('Error al realizar la consulta:', err);
      res.send('Error en hacer valiaar si usuario está registado').status(501);
    });
});

module.exports = router;
