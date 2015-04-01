var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var KnexSessionStore = require('connect-session-knex')(session);

var routes = require('./routes/index');
var admin = require('./routes/admin');
var auth = require('./routes/auth.js');
var photoHeader = require('./routes/ajax/photoHeader');
var app = express();

knex = require('knex')({
    client: 'mysql',
    connection: {
        host     : '127.0.0.1',
        user     : 'root',
        password : 'alexas',
        database : 'design',
        charset  : 'utf8'
    }
});

var storeSession = new KnexSessionStore({
	knex: knex,
	tablename: 'session'
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session ({
	resave: false,
    saveUninitialized: false, 
    secret: 'awesomeServer',
    key: 'sid',
    cookie: { httpOnly: true, maxAge: null },
	store: storeSession
}));
        
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/', auth);
app.use(function(req, res, next){
	if (req.session.authorized){
		next();	
	} else {
		var err = new Error('Permission denied');
		err.status = 403;
		next(err);	
	}
})
app.use('/', admin);
app.use('/', photoHeader);



app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}


app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
