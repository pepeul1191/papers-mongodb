function preResponse(){
  return function (req, res, next) {
    res.set('Server', 'Ubuntu');
    return next();
  }
}

exports.preResponse= preResponse;