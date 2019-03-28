const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const expressSession = require('express-session');

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const reservationRouter = require('./routes/reservation');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({
  secret: 'AQS',
  saveUninitialized: false,
  resave: false
}));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/reservation', reservationRouter);

app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

const config = require('./config/ui/selections');

var hrefs = Object.keys(config); // array of hrefs
console.log(hrefs);

var selections = Object.keys(config[hrefs[0]]);
console.log(selections);

var obj = Object.keys(config[hrefs[0]][selections[0]]);
console.log(obj);
var vals = Object.values(config[hrefs[0]][selections[0]]);
console.log(vals);

module.exports = app;
