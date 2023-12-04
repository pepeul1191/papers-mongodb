var express = require('express');
const { Op } = require("sequelize");
var router = express.Router();
var constants = require('../../config/constants')();
var helpers = require('../../config/helpers');
const User = require('../models/user');
const sessionFalse = require('../middlewares/session_false');
const { indexCss, indexJs } = require('../helpers/login_helper');
const multer = require("multer");
const fs = require('fs');
const path = require('path');

const upload = multer({ dest: "public/uploads/" });

// path = /file

router.post('/upload', upload.array("file"), async (req, res, next) => {
  // data
  console.log(req.body)
  console.log(req.files)
  const extension = req.files[0].originalname.split('.').slice(-1)[0];
  const originalPath = req.files[0].path; // Reemplaza con la ruta de tu archivo original
  const newName = req.files[0].filename + '.' + extension; // Nuevo nombre del archivo
  const newPath = path.join(path.dirname(originalPath), newName);
  fs.rename(originalPath, newPath, (err) => {
    if (err) {
      // response
      res.send('Se subió mal el archivo').status(500);
    }else{
      res.send(newPath.substring(7)).status(200);
    }
  });
});

module.exports = router; 
