import constants from '../../config/constants.js';

const sessionFalseMiddleware = (req, res, next) => {
  if (constants.session === true){
    if(req.session.state === 'activate'){
      return res.redirect('/');
    }
  }
  return next();
};

export default sessionFalseMiddleware;
