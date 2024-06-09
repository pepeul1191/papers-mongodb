import constants from '../../config/constants.js';

const sessionTrueMiddleware = (req, res, next) => {
  if (constants.session === true) {
    let canContinue = true;
    if (req.session.state !== 'activate') {
      req.session.message = 'Su tiempo de sesión ha terminado';
      canContinue = false;
    }
    if (req.session.state === undefined) {
      req.session.message = 'Necesita estar logueado';
      canContinue = false;
    }
    if (!canContinue) {
      return res.redirect('/error/access/8080');
    }
  }
  return next();
};

export default sessionTrueMiddleware;
