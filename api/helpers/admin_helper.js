var constants = require('../../config/constants')();

const indexCss = () => {
  var resp = [];
  if(constants.static == 'dev'){
    resp = [
      'bower_components/bootstrap/dist/css/bootstrap.min',
      'bower_components/font-awesome/css/font-awesome.min',
      'assets/css/constants',
      'assets/css/error',
    ];
  }
  if(constants.static == 'build'){
    resp = [
      'dist/test.min'
    ];
  }
  return resp;
}

const indexJs = () => {
  var resp = [];
  if(constants.static == 'dev'){
    resp = [
      'bower_components/jquery/dist/jquery.min',
      'bower_components/bootstrap/dist/js/bootstrap.min',
    ];
  }
  if(constants.static == 'build'){
    resp = [
    ];
  }
  return resp;
}

exports.indexCss= indexCss;
exports.indexJs= indexJs;
