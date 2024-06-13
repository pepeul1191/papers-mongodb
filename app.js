// var createError = require('http-errors');
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import logger from 'morgan';
import bootstrap from './config/bootstrap.js';
import sockets from './config/sockets.js';
import error404 from './api/middlewares/error_404.js';
import preResponse from './api/middlewares/pre_response.js';
import cors from 'cors';
import expressWs from 'express-ws';

// init app
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const app = express();
expressWs(app);
// console.log(path.join(__dirname, 'views'))
app.set('view engine', 'ejs');
//app.set('views', 'C:\\desarrollo\\papers2\\views');
app.set('views', path.join(__dirname, 'views'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(preResponse);
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static('C:\\desarrollo\\papers2\\public'));

app.use(cookieSession({
  name: 'session',
  keys: ['WYHHoSbCWyOaEjVnGWlbzodNIXvKlYCPFdhcnKyWhISThcZtfI'],
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

// load controllers and sockets
bootstrap(app);
sockets(app);

// custom redirect catch 404 and forward to error handler
app.use(error404);

// express error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// run app
const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
