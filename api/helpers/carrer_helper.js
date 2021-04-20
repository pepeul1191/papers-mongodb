var constants = require('../../config/constants')();

const indexCss = () => {
  var resp = [];
  if(constants.static == 'dev'){
    resp = [
      'bower_components/bootstrap/dist/css/bootstrap.min',
      'bower_components/font-awesome/css/font-awesome.min',
      'assets/css/constants',
      'assets/css/styles',
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

const prevMessage = (prev) => {
  var resp = '';
  switch (prev) {
    case 'delete-error':
      resp = `<div class="alert alert-danger" role="alert">
        Ocurrió un error en eliminar la carrera.
      </div>`
      break;
    case 'edit-error':
      resp = `<div class="alert alert-danger" role="alert">
        Ocurrió un error en editar la carrera.
      </div>`
      break;
    case 'add-error':
      resp = `<div class="alert alert-danger" role="alert">
        Ocurrió un error en crear la carrera.
      </div>`
      break;
    case 'edit-ok':
      resp = `<div class="alert alert-success" role="alert">
        Se ha editado una carrera.
      </div>`
      break;
    case 'add-ok':
      resp = `<div class="alert alert-success" role="alert">
        Se ha creado una carrera.
      </div>`
      break;
    case 'delete-ok':
      resp = `<div class="alert alert-success" role="alert">
        Se ha eliminado una carrera.
      </div>`
      break;
    default:
      break;
  }
  return resp;
}

exports.indexCss= indexCss;
exports.indexJs= indexJs;
exports.prevMessage = prevMessage;
