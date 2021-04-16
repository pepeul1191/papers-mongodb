var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var boostrap = require('./config/bootstrap');
var middlewares = require('./config/middlewares');

var app = express();
// express setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(middlewares.preResponse());
app.use(express.static(path.join(__dirname, 'public')));
// load controllers
boostrap(app);
// custom redirect catch 404 and forward to error handler
app.use(middlewares.error404());
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
