const serverHeaderMiddleware = (req, res, next) => {
  res.set('Server', 'Ubuntu');
  return next();
};

export default serverHeaderMiddleware;
