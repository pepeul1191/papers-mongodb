var constants = require('./constants');

const loadCss = (csss) => {
  var resp = ''
  if (typeof csss != 'undefined'){
    for(var i = 0; i < csss.length; i++){
      resp = resp + '<link rel="stylesheet" type="text/css" href="'+ constants().static_url + csss[i] + '.css" />'
    }
  }
  return resp
}

const loadJs = (jss) => {
  var resp = ''
  if (typeof jss != 'undefined'){
    for(var i = 0; i < jss.length; i++){
      resp = resp + '<script src="' + constants().static_url + jss[i] + '.js"></script>'
    }
  }
  return resp
}

const randomSN = (length) => {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

exports.loadCss= loadCss;
exports.loadJs= loadJs;
exports.randomSN= randomSN;
