module.exports = (req, res, next) => {
  res.set('Server', 'Ubuntu');
  return next();
};
