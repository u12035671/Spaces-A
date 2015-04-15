var spaces = require('./buzz-spaces/spaces.js');
	
	function testAssignAdmin()
	{
		var assignAdminObj = {};
			assignAdminObj.moduleID='zzz';
			assignAdminObj.userID='1';
			assignAdminObj.newAdmin={id:3};
			assignAdminObj.adminUsers=[{id:1},{id:2}];
		
		var resultAssignAdmin = spaces.assignAdministrator(assignAdminObj);   
	}
	
	function testRemoveAdmin()
		var removeAdminObj = {};
			removeAdminObj.moduleID='zzz';
			removeAdminObj.userID='1';
			removeAdminObj.adminToRemove={id:3};
			
		var resultRemoveAdmin = spaces.removeAdministrator(removeAdminObj);   
	}
	
	function testIsAdmin()
	{
		var isAdminObj = {};
			isAdminObj.moduleID='zzz';
			isAdminObj.userID='1';
			
		var resultIsAdmin = spaces.isAdministrator(isAdminObj);  
	}
	
	function testGetProfile()
	{
		var getProfileObj = {};
			getProfileObj.userID='1';
			
		var resultGetProfile = spaces.getProfileForUser(getProfileObj); 
	}
	
	function testRegisterOnBuzz()
	{
		var registerObj = {};
			registerObj.moduleID='zzz';
			registerObj.userID='1';
			registerObj.userNameForBuzzSpace=//username//;
			registerObj.signature=//signature//;
			
		var resultRegisterOnBuzz = spaces.registerOnBuzzSpace(registerObj);   
	}
	
//Ivan please add your 2 functions below this comment, I am busy with mine above this line

function testCreateAndClose()
{
	var createSpaceTest1 = {};
		createSpaceTest1.academicYear='2';
        createSpaceTest1.isOpen='yes';
        createSpaceTest1.moduleID='1';
        createSpaceTest1.name'test';
        createSpaceTest1.adminUsers=0;
		
	var createSpaceTest2 = {};
		createSpaceTest2.academicYear='2';
        createSpaceTest2.isOpen='yes';
        createSpaceTest2.moduleID='1';
        createSpaceTest2.name'test';
        createSpaceTest2.adminUsers=0;
		
	var createSpaceTest3 = {};
		createSpaceTest3.academicYear='1';
        createSpaceTest3.isOpen='yes';
        createSpaceTest3.moduleID='2';
        createSpaceTest3.name'test2';
        createSpaceTest3.adminUsers=0;
	
	//Create two new spaces to test
	var testCreate1 = spaces.createBuzzSpace(createSpaceTest1);
	var testCreate2 = spaces.createBuzzSpace(createSpaceTest2);
	
	//Delete one of the earlier created spaces to test
	var testClose1 = spaces.closeBuzzSpace(createSpaceTest2);
	
	//Create the deleted space once again
	var testCreate3 = spaces.createBuzzSpace(createSpaceTest2);
	
	//Delete a non existing space
	var testClose2 = spaces.closeBuzzSpace(createSpaceTest3);
	
}