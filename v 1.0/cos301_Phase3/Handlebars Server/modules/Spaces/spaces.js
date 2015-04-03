/**
 * Created by Jaco-Louis on 2015/03/17.
 */
/*
    This module will be used to create and close various Buzz Spaces
 */
/**
 * Created by Jaco-Louis on 2015/03/17.
 */

/*
 This module will be used to create and close various Buzz Spaces
 */

var mongoose = require('mongoose');
var sp = require('../Database/connect.js');
// Schema
var spacesSchema = mongoose.Schema({
    name: String,
    academicYear: String,
    isOpen: String,
    moduleID: String,
    adminUsers : Array
})
// Add method to schema
spacesSchema.methods.speak = function () {
    var moduleName = this.name
        ? "Module name is " + this.name
        : "I don't have a name"
    //console.log(moduleName);
}

// Compile schema into a model (class that constructs documents)
var Space = mongoose.model('Spaces', spacesSchema)
// end schema

function isAuthorized(userId, moduleId) { return true; };

//exports.closeBuzzSpace = function (userId, moduleId) {
exports.closeBuzzSpace = function (closeBuzzSpaceRequest) {
	// check if space exists
	Space.findOne({moduleID: closeBuzzSpaceRequest.moduleId}, function (err, result) {
		if (err) {
			closeBuzzSpaceRequest.callback(new Error("NoSuchBuzzSpaceException"));
		} else {
			// check if user is an admin for buzz space
			if (isAuthorized(closeBuzzSpaceRequest.userId, closeBuzzSpaceRequest.moduleId)) {
				if (result == null) {
					// Module does not exist
					console.log("Did not found space that should be closed");
				}
				else {
					if (result.isOpen == "false" || result.isOpen == false) {
						console.log("Space is already closed");
					} else {
						//else module exists, update
						console.log("Found space that should be closed");
						result.isOpen = false;
						
						result.save(function (err) {
							//res.send(result);
						});
					}	
				}
				closeBuzzSpaceRequest.callback(null, result);
			} else {
				closeBuzzSpaceRequest.callback(new Error("NotAuthorizedException"));
			}
		}
	});
};


//exports.createBuzzSpace = function (academicYear,isOpen,moduleID,name,adminUsers) {
exports.createBuzzSpace = function (createBuzzSpaceRequest) {
	var newBuzzSpace = new Space({
		academicYear: createBuzzSpaceRequest.academicYear,
		isOpen: createBuzzSpaceRequest.isOpen,
		moduleID: createBuzzSpaceRequest.moduleID,
		name: createBuzzSpaceRequest.name,
		adminUsers: createBuzzSpaceRequest.adminUsers
	});
	
    //check if the module exists
    Space.findOne({moduleID: createBuzzSpaceRequest.moduleID}, function (err,result) {
        if (result == null) {
            console.log("Buzz space not yet created, able to insert");
            newBuzzSpace.save(function (err, cosTest) {
                if (err) return console.error(err);

                Space.find(function (err, spaces) {
                    if (err) return console.error(err);
                    //console.log(spaces);
                })
            });
        }
        else{
            console.log("Buzz space already exists");

            Space.find(function (err, spaces) {
                if (err) return console.error(err);
                //console.log(spaces);
            })
            newBuzzSpace = result;
        }

    })

    return newBuzzSpace;
};

//exports.assignAdministrator = function (academicYear,isOpen,moduleID,name,adminUsers,newAdmin, userId) {
exports.assignAdministrator = function (assignAdministratorRequest) {
    //check if the module exists
    Space.findOne({'moduleID': assignAdministratorRequest.moduleID},function (err,result) {
        if (result == null) {
            //throw new Error("NoSuchBuzzSpaceException");
            console.log("Could not find buzz space to close");
        } else {
            console.log("Found module to assign admin to");
            // check if user is an admin for buzz space
            if (isAuthorized(assignAdministratorRequest.userId, assignAdministratorRequest.moduleID)) {
                result.adminUsers.push(assignAdministratorRequest.newAdmin);

                result.save(function (err) {
                    //res.send(result);
                });
            } else {
                throw new Error("NotAuthorizedException");
            }
        }
    })

    return assignAdministratorRequest.adminUsers;
};

//exports.removeAdministrator = function (userId, moduleID, adminToRemove) {
exports.removeAdministrator = function (removeAdministratorRequest) {

    var obj = {};
    Space.findOne({'moduleID': removeAdministratorRequest.moduleID},function (err,result) {
        if (result == null) {
            //throw new Error("NoSuchBuzzSpaceException");
            console.log("Could not find buzz space to remove admin from");
        } else {
            console.log("Found module to remove admin from");
            // check if user is an admin for buzz space
            if (isAuthorized(removeAdministratorRequest.userId, removeAdministratorRequest.moduleID)) {

                // *******************************************
                // Outline of how to find an admin, please fix
                // *******************************************
                var index = result.adminUsers.indexOf(removeAdministratorRequest.adminToRemove);

                if (index > -1) {
                    result.adminUsers.splice(index, 1);
                }
                if (index == -1) {
                    console.log("Could not find administrator to remove on the buzz space.");
                }
                // *******************************************
                // End of outline
                // *******************************************
		
                result.save(function (err) {
                    //res.send(result);
                });
            } else {
                throw new Error("NotAuthorizedException");
            }
        }
        obj = result;
    })

    return obj;
};

//exports.isAdministrator = function(userId,adminUsers)
exports.isAdministrator = function(isAdministratorRequest)
{
    Space.findOne({'userId' : isAdministratorRequest.userId}, function(err,result)
    {
        if(err)
        {
            console.error(err);
        }
        else
        {
            //assuming admin users are sent via a array
            var a  = isAdministratorRequest.adminUsers.indexOf(result);
            if(a === -1)
                return false;
            else
                return true;
        }
    })
};


//exports.getProfileForUser = function(userId)
exports.getProfileForUser = function(getProfileForUserRequest)
{
    Space.findOne({"userId": getProfileForUserRequest.userId}, function (err,result)
    {
        //User id is sent through and findOne returns object of user with all users info
        if(err)
        {
            console.error(err);
        }
        else
        {
            return result;
        }
    })
};