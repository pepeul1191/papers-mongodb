var homeController = require('../api/controllers/home_controller');
var fileController = require('../api/controllers/file_controller');
var errorController = require('../api/controllers/error_controller');
var loginController = require('../api/controllers/login_controller');

module.exports = (app) => {
  app.use('/', homeController);
  app.use('/error', errorController);
  app.use('/login', loginController);
  app.use('/file', fileController);
}
