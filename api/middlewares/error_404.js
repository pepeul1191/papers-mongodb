const { getContent } = require('../../config/contents');

module.exports = (req, res, next) => {
  var lang = 'sp';
  if ('GET' == req.method){
    var resource = req.path.split('.');
    var extensions = ['css', 'js', 'png', 'jpg', ];
    if(extensions.indexOf(resource[resource.length - 1]) == -1){
      res.redirect('/error/access/404');
    }else {
      return next();
    }
  }else{
    var resp = getContent('error')[lang]['error_handler']['post_404'];
    res.status(404).send(resp);
  }
};
