var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const cors = require('cors');
require('dotenv').config();

require('./utils/common/dbConnection');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Global variables for using in the app.
global._MESSAGE = require("./config/messageConfig");
global._CONSTANT = require("./config/constantsConfig");
global._STATUS = require("./config/constantsConfig").statusCode;
global._RESPONSE = require("./utils/common/responseHelper");
global._CATCHASYNC = require("./utils/common/catchAsync");
global._APIERROR = require("./utils/common/apiError");

// Routes
require('./routes')(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  console.log("ERROR =========== ERROR ===========> ", err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  // res.status(err.status || 500);
  // res.render('error');

  _RESPONSE.sendErrorResponse(res, err.message, err.status || 500, {});
});

module.exports = app;
