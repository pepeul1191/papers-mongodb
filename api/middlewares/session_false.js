var constants = require('../../config/constants')();

module.exports = (req, res, next) => {
  if (constants.session == true){
    if(req.session.state == 'activate'){
      return res.redirect('/');
    }
  }
  return next();
};
