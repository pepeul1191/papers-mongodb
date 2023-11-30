var homeController = require('../api/controllers/home_controller');
var userController = require('../api/controllers/user_controller');
var studentController = require('../api/controllers/student_controller');
var loginController = require('../api/controllers/login_controller');
var adminController = require('../api/controllers/admin_controller');
var carrerController = require('../api/controllers/carrer_controller');
var pokemonController = require('../api/controllers/pokemon_controller');
var memberController = require('../api/controllers/member_controller');
var exerciseController = require('../api/controllers/exercise_controller');
var bodyPartController = require('../api/controllers/body_part_controller');
var fileController = require('../api/controllers/file_controller');
var errorController = require('../api/controllers/error_controller');

module.exports = (app) => {
  app.use('/', homeController);
  app.use('/user', userController);
  app.use('/student', studentController);
  app.use('/error', errorController);
  app.use('/admin', adminController);
  app.use('/carrer', carrerController);
  app.use('/login', loginController);
  app.use('/pokemon', pokemonController);
  app.use('/member', memberController);
  app.use('/exercise', exerciseController);
  app.use('/body_part', bodyPartController);
  app.use('/file', fileController);
}
