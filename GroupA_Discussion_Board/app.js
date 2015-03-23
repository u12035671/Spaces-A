var express = require('express'); // Express server
var path = require('path'); // Routing and path usage
var favicon = require('serve-favicon');
var logger = require('morgan'); // Logging of events on console in easy readable format
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//**********************Include various modules from different groups here******************************
var spaces = require('./modules/Spaces/spaces.js');
//console.log(spaces.createBuzzSpace(2015,true,'zzz','Jan',[{id:1},{id:2}]));
//console.log(spaces.closeBuzzSpace('1','aaa'));
//console.log(spaces.assignAdministrator('2015', true, 'zzz', 'Jan', [{id:1},{id:2}], {id:3}, '1'));
console.log(spaces.removeAdministrator('1', 'zzz', {id:2}));
//**********************Include various modules from different groups here******************************

//console.log("Calling space create: " + spaces.createBuzzSpace()); Simple example of creating a space using function defined in Spaces module

// Routing paths
var routes = require('./routes/index'); // Routing to index page
var users = require('./routes/users'); // Routing to user page
var app = express();

// Scribe js for logging of server events. Go to http://localhost:5000/logs for more detail on logs for each day
var scribe = require('scribe-js')(); //loads Scribe
app.use(scribe.express.logger()); //Log each request
app.use('/logs', scribe.webPanel());
// Database connection using mongoose
var connection = require('./modules/Database/connect.js') //Initial connection to the database
// React js
var React = require('react');
// il8n translate
var i18n = new (require('i18n-2'))({
    // setup some locales - other locales default to the first locale
    locales: ['en', 'de']
});
// ldap js
var ldap = require('ldapjs');
// nodemailer
var nodemailer = require('nodemailer');
// node-aop
var aop = require("node-aop");// Node.js require. Use window.aop in browser
/*
**************TO-DO******************
* jsreport
* handlebars
* broadway plugin framework
* electrolyte
* node-cache caching framework
* restify REST framework
 */

/*

This is the main entry point for the node js server for the Discussion Board
In order to run the server, open command line in the folder where this file is hosted, enter the command: node app.js and the server will start

 */
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

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


// Basic creation of server
var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Node server running on port: " + port);
});

module.exports = app;
