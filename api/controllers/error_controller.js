import express from 'express';
const router = express.Router();
import constants from '../../config/constants.js';
import { getContent, getTitle } from '../../config/contents.js';
import { accessCss, accessJs } from '../helpers/error_helper.js';

router.get('/access/:num', (req, res, next) => {
  const status = 404;
  const errorNumber = req.params.num;
  const registeredErrors = ['404', '5051', '8080'];
  const lang = 'sp';
  // check if error content is not registered then, default error 404
  const error = registeredErrors.includes(errorNumber) ? errorNumber : '404';
  // response
  const locals = {
    constants: constants(),
    title: getTitle()[lang]['error'],
    csss: accessCss(),
    jss: accessJs(),
    contents: getContent('error')[lang][error],
    lang: lang,
  };
  res.render('error', locals);
});

export default router;
