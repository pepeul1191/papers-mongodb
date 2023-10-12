var constants = require('../../config/constants')();

const indexCss = () => {
  var resp = [];
  if(constants.static == 'dev'){
    resp = [
      'build/bundle',
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
      'build/bundle',
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
