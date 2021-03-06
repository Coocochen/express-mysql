var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const url = require('url');

var indexRouter = require('./routes/index');
var tagRouter = require('./routes/tag');
var photosRouter = require('./routes/photos');
var adminRouter = require('./routes/admin');
var commentRouter = require('./routes/comment');

var app = express();
// set DEBUG=myapp:* & npm start
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/tag', tagRouter);
app.use('/photos',photosRouter);
app.use('/admin',adminRouter);
app.use('/comment',commentRouter);

app.get('/*', function (request, response){
    console.log('url:'+url.parse(request.url).href);
    response.sendFile(path.join(__dirname, 'public/index.html'))
})

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
  res.render('error');
});

module.exports = app;
