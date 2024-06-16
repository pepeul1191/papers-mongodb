import express from 'express';
const router = express.Router();
import constants from '../../config/constants.js';
//import helpers from '../../config/helpers.js';
import { indexCss, indexJs } from '../helpers/home_helper.js';

const view_routes = [
  '', 
  '/paper', 
  '/paper/add', 
  '/paper/edit/:_id', 
  '/topic', 
  '/contact', 
  '/topic/:_id/tag',
  '/topic/:_id/paper',
  '/topic/:_id/paper/add',
];
router.get(view_routes, (req, res, next) => {
  // response
  const locals = {
    constants: constants,
    title: 'Bienvenido',
    session: req.session,
    contents: {},
  };
  res.status(200).render('papers', locals);
});

router.get('/profile', (req, res, next) => {
  const body = 'Usuario: ' + req.session.user + '<br>' +
    'Estado: ' + req.session.state + '<br>' +
    'Momento: ' + req.session.time;
  res.status(200).send(body);
});

router.get('/sign-out', (req, res, next) => {
  req.session = null;
  res.redirect('/');
});

router.get('/about', (req, res, next) => {
  const group = [
    { codigo: 20051191, nombre: 'Pepe Valdivia' },
    { codigo: 20071191, nombre: 'Yacky Ramirez' },
    { codigo: 20161191, nombre: 'Sila Esculapia' },
    { codigo: 20231191, nombre: 'Chicle Pinkerton' },
  ];
  res.status(200).send(JSON.stringify(group));
});

router.get('/demo/', (req, res, next) => {
  console.log('XD');
  req.session = null;
  res.redirect('/');
});

export default router;
