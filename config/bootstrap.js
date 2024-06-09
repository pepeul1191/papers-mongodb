import homeController from '../api/controllers/home_controller.js';
import fileController from '../api/controllers/file_controller.js';
import errorController from '../api/controllers/error_controller.js';
import loginController from '../api/controllers/login_controller.js';
import paperController from '../api/controllers/paper_controller.js';

export default (app) => {
  app.use('/', homeController);
  app.use('/error', errorController);
  app.use('/login', loginController);
  app.use('/file', fileController);
  app.use('/paper', paperController);
}
