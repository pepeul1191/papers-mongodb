import homeController from '../api/controllers/home_controller.js';
import fileController from '../api/controllers/file_controller.js';
import errorController from '../api/controllers/error_controller.js';
import loginController from '../api/controllers/login_controller.js';
import paperController from '../api/controllers/paper_controller.js';
import imageController from '../api/controllers/image_controller.js';
import topicController from '../api/controllers/topic_controller.js';
import tagController from '../api/controllers/tag_controller.js';
import searchStringController from '../api/controllers/search_string_controller.js';

export default (app) => {
  app.use('/', homeController);
  app.use('/error', errorController);
  app.use('/login', loginController);
  app.use('/file', fileController);
  app.use('/paper', paperController);
  app.use('/image', imageController);
  app.use('/topic', topicController);
  app.use('/tag', tagController);
  app.use('/search-string', searchStringController);
}
