import express from 'express';
const router = express.Router();
import constants from '../../config/constants.js';

router.get('', (req, res, next) => {
  // response
  const locals = {
    constants: constants,
    title: 'Bienvenido',
    session: req.session,
    contents: {},
  };
  res.status(200).render('papers', locals);
});

export default router;
