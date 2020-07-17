var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
const fileUpload = require('express-fileupload');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var worksRouter = require('./routes/ex-works');
const cors = require('cors');
var app = express();
app.use(fileUpload());
require('./db/db')

// const ExampleOfWork = require('./models/ExampleOfWork')
// var a = new ExampleOfWork();
// a.save()
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

// use it before all route definitions
app.use(cors({origin: 'http://localhost:8080'}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/works', worksRouter)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;