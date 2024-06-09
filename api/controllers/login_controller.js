import express from 'express';
const router = express.Router();
import constants from '../../config/constants.js';
//import helpers from '../../config/helpers.js';
import sessionFalse from '../middlewares/session_false.js';
import { indexCss, indexJs } from '../helpers/login_helper.js';

const index = (req, res, next) => {
  // response
  const locals = {
    constants: constants(),
    title: 'Bienvenido',
    //helpers: helpers,
    csss: indexCss(),
    jss: indexJs(),
    message: '',
    messageColor: '',
    contents: {},
  };
  res.render('login', locals);
}

router.get('', sessionFalse, index);

export default router;
