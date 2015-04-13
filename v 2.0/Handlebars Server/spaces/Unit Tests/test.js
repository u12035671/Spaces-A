var spaces = require('./buzz-spaces/spaces.js');
	
	var assignAdminObj = {};
		assignAdminObj.moduleID='zzz';
		assignAdminObj.userID='1';
		assignAdminObj.newAdmin={id:3};
		assignAdminObj.adminUsers=[{id:1},{id:2}];
		
	var result = spaces.assignAdministrator(assignAdminObj);   
	
	var removeAdminObj = {};
		removeAdminObj.moduleID='zzz';
		removeAdminObj.userID='1';
		removeAdminObj.adminToRemove={id:3};
		
	var result = spaces.removeAdministrator(removeAdminObj);   
	
	var isAdminObj = {};
		isAdminObj.moduleID='zzz';
		isAdminObj.userID='1';
		
	var result = spaces.isAdministrator(isAdminObj);  
	
	var getProfileObj = {};
		getProfileObj.userID='1';
		
	var result = spaces.getProfileForUser(getProfileObj); 
	
	var registerObj = {};
		registerObj.moduleID='zzz';
		registerObj.userID='1';
		registerObj.userNameForBuzzSpace=//username//;
		registerObj.signature=//signature//;
		
	var result = spaces.registerOnBuzzSpace(registerObj);   
	
//Ivan please add your 2 functions below this comment, I am busy with mine above this line