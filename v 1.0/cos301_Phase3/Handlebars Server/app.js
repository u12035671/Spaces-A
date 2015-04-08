var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
//var users = require('./routes/users');
var scribe = require('scribe-js')(); // Scribe js for logging of server events. Go to http://localhost:5000/logs for more detail on logs for each day

var ldap = require('ldapjs');// ldap js
var nodemailer = require('nodemailer');// nodemailer
var aop = require("node-aop");// Node.js require. Use window.aop in browser
//var i18n = new (require('i18n-2'))({
// setup some locales - other locales default to the first locale
//locales: ['en', 'de']
//});

var spaces = require('./modules/spaces/spaces');
var csds = require('csds');
var database = require('database');

var app = express();
app.use(scribe.express.logger()); //Log each request
app.use('/logs', scribe.webPanel());

app.use('/logs', scribe.webPanel());

var connection = require('database'); //Initial connection to the database

//
var b;
var a = spaces.getBuzzSpaces(b);
console.log(b);

/*
 Test code for spaces

 *//*
console.log(
	spaces.createBuzzSpace({
		academicYear: 2015,
		isOpen: true,
		moduleID: 'bbb',
		name: 'Jan',
		adminUsers: [{id:1},{id:2}]
	})
);
spaces.closeBuzzSpace({
	userID: '2',
	moduleID: 'aaa',
	callback: function (err, response) {
		if (err)
			console.log(err);
		else
			console.log(response);
	}
});
console.log(
	spaces.assignAdministrator({
		academicYear: '2015', 
		isOpen: true, 
		moduleID: 'zzz', 
		name: 'Jan', 
		adminUsers: [{id:1},{id:2}], 
		newAdmin: {id:3}, 
		userID: '1'
	})
);
spaces.removeAdministrator({
	userID: '1', 
	moduleID: 'zzz', 
	adminToRemove: {id:3},
	callback: function (err, response) {
		if (err)
			console.log(err);
		else
			console.log(response);
	}
});
spaces.isAdministrator({
	userID: '3',
	moduleID: 'zzz',
	callback: function (err, response) {
		if (err)
			console.log(err);
		else
			console.log(response);
	}
});
console.log(
	spaces.getProfileForUser({userID: '1'})
);
*//*

/////////////////TONIA ADDED Testing of notification module
var userAddress="tonia.michael94@gmail.com";         //Gmail username eg name before @gmail.com
var userAddressPassword="";   //Gmail password
var recipientAddress="u13014171@tuks.co.za";   //email address of recipient
var senderAddress="tonia.michael94@gmail.com";  //email address of sender
var mailSubject="jjju"; //Notification subject
var mailMessage="juu";//Message to be sent
notification.sendNotification(userAddress,userAddressPassword,senderAddress,recipientAddress,mailSubject,mailMessage);
//////////

*/

/*
 **************TO-DO******************
 * jsreport
 * handlebars
 * broadway plugin framework
 * electrolyte
 * node-cache caching framework
 * restify REST framework
 */
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

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

module.exports = app;
