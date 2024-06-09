import { getContent } from '../../config/contents.js';

const errorHandlerMiddleware = (req, res, next) => {
  const lang = 'sp';
  if (req.method === 'GET') {
    const resource = req.path.split('.');
    const extensions = ['css', 'js', 'png', 'jpg'];
    if (extensions.indexOf(resource[resource.length - 1]) === -1) {
      res.redirect('/error/access/404');
    } else {
      return next();
    }
  } else {
    const resp = getContent('error')[lang]['error_handler']['post_404'];
    res.status(404).send(resp);
  }
};

export default errorHandlerMiddleware;
