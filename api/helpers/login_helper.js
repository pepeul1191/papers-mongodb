var constants = require('../../config/constants')();
// var nodemailer = require('nodemailer');
// var mailTemplate = require( '../../views/mails/congratulaion');
// var _ = require('underscore');

const indexCss = () => {
  var resp = [];
  if(constants.static == 'dev'){
    resp = [
      'bower_components/bootstrap/dist/css/bootstrap.min',
      'bower_components/font-awesome/css/font-awesome.min',
      'assets/css/constants',
      'assets/css/styles',
      'assets/css/login',
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
      'bower_components/page/page',
      'assets/js/login',
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
