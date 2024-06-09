import constants from '../../config/constants.js';

const indexCss = () => {
  let resp = [];
  if (constants.static === 'dev') {
    resp = [
      'bower_components/bootstrap/dist/css/bootstrap.min',
      'bower_components/font-awesome/css/font-awesome.min',
      'assets/css/constants',
      'assets/css/styles',
      'assets/css/login',
    ];
  }
  if (constants.static === 'build') {
    resp = [
      'dist/test.min'
    ];
  }
  return resp;
}

const indexJs = () => {
  let resp = [];
  if (constants.static === 'dev') {
    resp = [
      'bower_components/jquery/dist/jquery.min',
      'bower_components/bootstrap/dist/js/bootstrap.min',
      'bower_components/page/page',
      'assets/js/login',
    ];
  }
  if (constants.static === 'build') {
    resp = [];
  }
  return resp;
}

export { indexCss, indexJs };
