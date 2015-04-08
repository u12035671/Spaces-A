var express = require('express');
var bodyparser = require('body-parser');
var urlencodedparser = bodyparser.urlencoded({extended:false});
var router = express.Router();

var spaces = require('../modules/spaces/spaces');

var mongoose = require('mongoose');


function getProfile (id) {
 return {title: "user " + id};
}

//rewuire module
///Get obejcts from module

/* GET home page. */
router.get('/', function(req, res, next) {
//Pass to page
  res.render('index', { title: 'Test' });
});
 

//Eg use get arguments from URL
router.get('/testing', function(req, res, next) {
//Pass to page
  res.render('test', getProfile(req.query.id));
});

//create space
router.get('/createSpace', function(req, res, next) {
//Pass to page
  res.render('./dynamic_views/createSpace');
});

//Close space
router.get('/closeSpace', function(req, res, next) {
//Pass to page
	val = spaces.getBuzzSpaces();
	console.log("*******************"+val);
	//console.log());
	/*
	var result = "<select name='moduleID'>";
	val.forEach(function(entry){
		result +="<option value="+entry+">"+entry+"</option>";
		});
	result += "</select>";
*/

  res.render('./dynamic_views/closeSpace',{module:val});
});


//Admin management
router.get('/adminManagement', function(req, res, next) {
//Pass to page
  res.render('./dynamic_views/adminManagement');
});

router.post('/submitCS', function(req, res, next){
	/*
	console.log("test ["+req.body.CSyear+"]");
	console.log("test ["+req.body.CSmodule+"]");
	console.log("test ["+req.body.CSname+"]");
	*/
	var obj ={};
		obj.academicYear=req.body.CSyear;
		obj.isOpen = true;
		obj.moduleID = req.body.CSmodule;
		obj.name = req.body.CSname;
		obj.adminUsers = [];
		
	var result = spaces.createBuzzSpace(obj);
	
	console.log("this is the result " + result);
	res.render('./dynamic_views/createSpace',{message: result});
});

router.post('/submitRS', function(req, res, next){
	//console.log("test ["+req.body.RSmodule+"]");
	//console.log("test ["+req.body.RSid+"]");
	var obj = {};
		obj.moduleID = req.body.RSmodule;
		obj.userID = req.body.RSid;
		
	var result = spaces.closeBuzzSpace(obj);
	
	res.render('./dynamic_views/closeSpace',{message: result});
});

router.post('/submitAAM', function(req, res, next){
	//console.log("test ["+req.body.Aadmin+"]");
	//console.log("test ["+req.body.AAid+"]");
	var obj = {};
		obj.moduleID = req.body.Aadmin;
		obj.userID = req.body.AAid;
		
	var result = spaces.assignAdministrator(obj);
	
	res.render('./dynamic_views/adminManagement',{message: result});
});

router.post('/submitRAM', function(req, res, next){
	//console.log("test ["+req.body.Radmin+"]");
	//console.log("test ["+req.body.AAid+"]");
	var obj = {};
		obj.moduleID = req.body.Radmin;
		obj.userID = req.body.RAid;
		
	var result = spaces.removeAdministrator (obj);
	res.render('./dynamic_views/adminManagement',{message: result});
});

module.exports = router;
