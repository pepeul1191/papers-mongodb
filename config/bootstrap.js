var homeController = require('../api/controllers/home_controller');
var userController = require('../api/controllers/user_controller');

module.exports = (app) => {
  app.use('/', homeController);
  app.use('/user', userController);
}
