const socketMiddleware = (socketReq, socketRes, next) => {
  console.log('middleware de socket');
  return next();
};

export default socketMiddleware;
