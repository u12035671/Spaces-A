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
		
	var result = spaces.assignAdministrator(removeAdminObj);   
	
//Ivan please add your 2 functions below this comment, I am busy with mine above this line