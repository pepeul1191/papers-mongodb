module.exports = (socketReq, socketRes, next) => {
  console.log('middelware socket')
  return next();
};
