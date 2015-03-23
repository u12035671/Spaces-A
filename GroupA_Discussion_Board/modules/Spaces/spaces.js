/**
 * Created by Jaco-Louis on 2015/03/17.
 */
/*
    This module will be used to create and close various Buzz Spaces
 */
 function isAuthorized(userId, moduleId) { return true; };
 
exports.closeBuzzSpace = function (userId, moduleId) {
	var obj = {};
	// check if space exists
	db.find({'moduleId':moduleId}, function (err, result) {
		if (err) {
			throw new Error("NoSuchBuzzSpaceException");
		} else {
			// check if user is an admin for buzz space
			if (isAuthorized(userId, moduleId)) {
				result.isOpen = false;
			} else {
				throw new Error("NotAuthorizedException");
			}
			obj = result;
		}
	});
	
	return obj;
};

exports.createBuzzSpace = function (academicYear,isOpen,moduleID,name,adminUsers) {

    var sp = require('../Database/connect.js');
    var newBuzzSpace = {};
    //check if the module exists
    db.find({'moduleID':moduleID},function (err,result) {
        if (err) {
            newBuzzSpace = {'academicYear':academicYear,'isOpen':isOpen,'moduleID':moduleID,'name':name,'adminUsers':adminUsers};
            var collection = db.collection('Spaces');
            collection.insert(newBuzzSpace);
        }
        else{
            newBuzzSpace = result;
        }

    })

    return newBuzzSpace;
};

//Very unsure, just added rough outline code
exports.assignAdministrator = function (academicYear,isOpen,moduleID,name,adminUsers,newAdmin) {

    var sp = require('../Database/connect.js');
    //var newBuzzSpace = {};
    //check if the module exists
    db.find({'moduleID':moduleID},function (err,result) {
       if (err) {
			throw new Error("NoSuchBuzzSpaceException");
		} else {
			// check if user is an admin for buzz space
			if (isAuthorized(userId, moduleId)) {
				adminUsers.add(newAdmin);
			} else {
				throw new Error("NotAuthorizedException");
			}
		}
	})

    return adminUsers;
};

exports.removeAdministrator = function (moduleID, adminToRemove, adminUsers, name) {
	
	var sp = require('../Database/connect.js');
	//check if module esxists
	db.find({'moduleID':moduleID},function (err, result) {
		if(err)
        {
			throw new Error("NoSuchBuzzSpaceException");
		} else {
			//check if user is an admin for this buzz space
			if (isAuthorized(userId, moduleId)) {
				adminUsers.remove(adminToRemove);
			} else {
				throw new Error("NotAuthorizedException");
			}
		}
	})
		
	return adminUsers;
};