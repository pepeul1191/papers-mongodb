var constants = require('../../config/constants')();

const indexCss = () => {
  var rpta = [];
  if(constants.static == 'dev'){
    rpta = [
      'bower_components/bootstrap/dist/css/bootstrap.min',
      'bower_components/font-awesome/css/font-awesome.min',
      'assets/css/constants',
      'assets/css/error',
    ];
  }
  if(constants.static == 'build'){
    rpta = [
      'dist/test.min'
    ];
  }
  return rpta;
}

const indexJs = () => {
  var rpta = [];
  if(constants.static == 'dev'){
    rpta = [
      'bower_components/jquery/dist/jquery.min',
      'bower_components/bootstrap/dist/js/bootstrap.min',
    ];
  }
  if(constants.static == 'build'){
    rpta = [
    ];
  }
  return rpta;
}

exports.indexCss= indexCss;
exports.indexJs= indexJs;
