import express from 'express';
import constants from '../../config/constants.js';
import sessionFalse from '../middlewares/session_false.js';
import { indexCss, indexJs } from '../helpers/login_helper.js';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

const router = express.Router();
const upload = multer({ dest: "public/uploads/" });

router.post('/upload', upload.array("file"), async (req, res, next) => {
  // data
  console.log(req.body);
  console.log(req.files);
  const extension = req.files[0].originalname.split('.').slice(-1)[0];
  const originalPath = req.files[0].path; // Reemplaza con la ruta de tu archivo original
  const newName = req.files[0].filename + '.' + extension; // Nuevo nombre del archivo
  const newPath = path.join(path.dirname(originalPath), newName);
  fs.rename(originalPath, newPath, (err) => {
    if (err) {
      // response
      res.send('Se subió mal el archivo').status(500);
    } else {
      res.send(newPath.substring(7)).status(200);
    }
  });
});

export default router;
