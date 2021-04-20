var constants = require('../../config/constants')();

module.exports = (req, res, next) => {
  if (constants.session == true){
    var canContinue = true;
    if(req.session.state != 'activate'){
      req.session.message = 'Su tiempo de sesión ha terminado';
      canContinue = false;
    }
    if(req.session.state === undefined){
      req.session.message = 'Nececita estar logeuado';
      canContinue = false;
    }
    if (canContinue == false){
      return res.redirect('/error/access/8080');
    }
  }
  return next();
};
