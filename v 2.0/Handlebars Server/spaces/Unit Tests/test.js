var spaces = require('./buzz-spaces/spaces.js');

//console.log(spaces.createBuzzSpace(2015,true,'zzz','Jan',[{id:1},{id:2}]));
//console.log(spaces.closeBuzzSpace('1','aaa'));
//console.log(spaces.assignAdministrator('2015', true, 'zzz', 'Jan', [{id:1},{id:2}], {id:3}, '1'));
//console.log(spaces.removeAdministrator('1', 'zzz', {id:2}));

//try to register on buzz space before space exists

temp.registerOnBuzzSpace

var createBuzzObj ={};
		createBuzzObj.userNameForBuzzSpace=req.body.RUuserName;
		createBuzzObj.signature=req.body.RUsignature;
		createBuzzObj.userID=req.body.RUuserid;
		createBuzzObj.moduleID=req.body.RUmoduleid;
		
	var result = spaces.createBuzzSpace(createBuzzObj);
	
	
//Ivan please add your 2 functions below this comment, I am busy with mine above this line