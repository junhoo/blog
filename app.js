var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var ejs = require('ejs');
var io = require('socket.io').listen(app);

var routes = require('./config/routes');
//var route = require('./routes/index');
//var users = require('./routes/users')

var app = express();  


mongoose.connect('mongodb://localhost/blogOne');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set( 'view engine', 'htm');
app.engine( '.htm', require( 'ejs').__express );
//app.engine('html', require('ejs').renderFile);
//app.set('view engine', 'html')
//app.engine('html',require( 'ejs').__express);
//app.set('view engine', 'html');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev')); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: "45454",
    store: new MongoStore({
		cookieSecret: 'jdghjf',
		db: 'blogOne',
		host: 'localhost'
	})
}));
console.log(routes);
routes(app);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//function tick(){
//	var now = new Date().toString();
//	io.sockets.send(now);
//}
//
//setInterval(tick, 1000);

app.listen(8080);

module.exports = app;


