// var createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const logger = require('morgan');
const bootstrap = require('./config/bootstrap');
const error404 = require('./api/middlewares/error_404');
const preResponse = require('./api/middlewares/pre_response');
const cors = require('cors');
const app = express();
// express setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(preResponse);
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieSession({
  name: 'session',
  keys: ['WYHHoSbCWyOaEjVnGWlbzodNIXvKlYCPFdhcnKyWhISThcZtfI'],
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))
// load controllers and sockets
bootstrap(app);
// sockets(app); -> esto está en www/bin
// custom redirect catch 404 and forward to error handler
//app.use(error404);
// express error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
