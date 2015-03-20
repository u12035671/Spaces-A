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

exports.createBuzzSpace = function () {
    return "Space created";
};