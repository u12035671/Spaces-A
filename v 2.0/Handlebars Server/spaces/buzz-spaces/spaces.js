/**
 * Created by Jaco-Louis on 2015/03/17.
 */

/*
 This module will be used to create and close various Buzz Spaces
 */

module.exports = function(database) {
    var mongoose = database.mongoose;

    var spacesSchema = mongoose.Schema({
        name: String,
        academicYear: String,
        isOpen: String,
        moduleID: String,
        adminUsers: Array
    });;

    // Add method to schema
    spacesSchema.methods.speak = function () {
        var moduleName = this.name
            ? "Module name is " + this.name
            : "I don't have a name";;
        //console.log(moduleName);
    };;

    // Compile schema into a model (class that constructs documents)
    var Space = mongoose.model('Spaces', spacesSchema);;
    // end schema
    
    
    var spacesProfileSchema = mongoose.Schema({
	userNameForBuzzSpace: String,
	signature: String,
	userID: String,
	moduleID: String
    });
     
     var SpaceProfile = mongoose.model('SpacesProfile', spacesProfileSchema);
    
    /**
     * Dexription....
     * @param userID
     * @param moduleID
     * @returns {boolean}
     */
    function isAuthorized(userID, moduleID) {
        return true;
    }
    var spaces = {};
    //exports.closeBuzzSpace = function (userID, moduleID) {

    /**
     *
     * @param closeBuzzSpaceRequest
     */
    spaces.closeBuzzSpace = function (closeBuzzSpaceRequest) {
        // check if space exists
        Space.findOne({'moduleID': closeBuzzSpaceRequest.moduleID}, function (err, result) {
            if (err) {
                closeBuzzSpaceRequest.callback(err);
            } else if (result == null) {
                // Module does not exist
                console.log("Did not find space that should be closed");
                closeBuzzSpaceRequest.callback(new Error("NoSuchBuzzSpaceException"));
            } else {
                // check if user is an admin for buzz space
                spaces.isAdministrator({
                    userID: closeBuzzSpaceRequest.userID,
                    moduleID: closeBuzzSpaceRequest.moduleID,
                    callback: function (error, response) {
                        if (error) {
                            closeBuzzSpaceRequest.callback(error);
                        } else if (response == false) {
                            console.log("Not an admin of this buzz space");
                            closeBuzzSpaceRequest.callback(new Error("NotAuthorizedException"));
                        } else {
                            //else module exists, update
                            console.log("Found space that should be closed");
                            result.isOpen = false;

                            // save changes
                            result.save(function (err) {
                                //res.send(result);
                            });
                            console.log("Space closed successfully");

                            closeBuzzSpaceRequest.callback(null, result);
                        }
                    }
                });
            }
        });
    };


    //exports.createBuzzSpace = function (academicYear,isOpen,moduleID,name,adminUsers) {
    /**
     *
     * @param createBuzzSpaceRequest
     * @returns {Space}
     */
    spaces.createBuzzSpace = function (createBuzzSpaceRequest) {
        var newBuzzSpace = new Space({
            academicYear: createBuzzSpaceRequest.academicYear,
            isOpen: createBuzzSpaceRequest.isOpen,
            moduleID: createBuzzSpaceRequest.moduleID,
            name: createBuzzSpaceRequest.name,
            adminUsers: createBuzzSpaceRequest.adminUsers
        });

        //check if the module exists
        Space.findOne({'moduleID': createBuzzSpaceRequest.moduleID}, function (err, result) {
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
            else {
                console.log("Buzz space already exists");

                Space.find(function (err, spaces) {
                    if (err) return console.error(err);
                    //console.log(spaces);
                });;
                newBuzzSpace = result;
            }

        });;

        return newBuzzSpace;
    };

    //exports.assignAdministrator = function (academicYear,isOpen,moduleID,name,adminUsers,newAdmin, userID) {
    /**
     *
     * @param assignAdministratorRequest
     * @returns {*|spacesSchema.adminUsers|newBuzzSpace.adminUsers|Array}
     */
    spaces.assignAdministrator = function (assignAdministratorRequest) {
        //check if the module exists
        Space.findOne({'moduleID': assignAdministratorRequest.moduleID}, function (err, result) {
            if (result == null) {
                //throw new Error("NoSuchBuzzSpaceException");
                console.log("Could not find buzz space to close");
            } else {
                console.log("Found module to assign admin to");
                // check if user is an admin for buzz space
                if (isAuthorized(assignAdministratorRequest.userID, assignAdministratorRequest.moduleID)) {
                    result.adminUsers.push(assignAdministratorRequest.newAdmin);

                    result.save(function (err) {
                        //res.send(result);
                    });
                } else {
                    throw new Error("NotAuthorizedException");
                }
            }
        });;

        return assignAdministratorRequest.adminUsers;
    };

    //exports.removeAdministrator = function (userID, moduleID, adminToRemove) {
    /**
     *
     * @param removeAdministratorRequest
     */
    spaces.removeAdministrator = function (removeAdministratorRequest) {
        Space.findOne({'moduleID': removeAdministratorRequest.moduleID}, function (err, result) {
            if (err) {
                removeAdministratorRequest.callback(err);
            } else if (result == null) {
                console.log("Could not find buzz space to remove admin from");
                removeAdministratorRequest.callback(new Error("NoSuchBuzzSpaceException"));
            } else {
                console.log("Found module to remove admin from");

                // check if user is an admin for buzz space
                spaces.isAdministrator({
                    userID: removeAdministratorRequest.userID,
                    moduleID: removeAdministratorRequest.moduleID,
                    callback: function (error, response) {
                        if (error) {
                            removeAdministratorRequest.callback(error);
                        } else if (response == false) {
                            console.log("Not an admin of this buzz space");
                            removeAdministratorRequest.callback(new Error("NotAuthorizedException"));
                        } else {
                            // you are an admin, proceed to remove other admin
                            console.log("You are admin of buzz space");

                            // find index of the admin to be removed as specified by removeAdministratorRequest.adminToRemove
                            var index = result.adminUsers.map(function (admin) {
                                return admin.id;
                            }).indexOf(parseInt(removeAdministratorRequest.adminToRemove.id, 10) || removeAdministratorRequest.adminToRemove.id);

                            if (index === -1) {
                                console.log("Could not find administrator to remove on the buzz space.");
                            } else {
                                // remove admin from admin group
                                result.adminUsers.splice(index, 1);

                                // save changes
                                result.save(function (err) {
                                    //res.send(result);
                                });
                                console.log("Admin removed successfully");
                            }
                            removeAdministratorRequest.callback(null, result);
                        }
                    }
                });
            }
        });
    };

    /*exports.removeAdministrator = function (removeAdministratorRequest) {

     var obj = {};
     Space.findOne({'moduleID': removeAdministratorRequest.moduleID}, function (err, result) {
     if (result == null) {
     //throw new Error("NoSuchBuzzSpaceException");
     console.log("Could not find buzz space to remove admin from");
     } else {
     console.log("Found module to remove admin from");
     // check if user is an admin for buzz space
     if (isAuthorized(removeAdministratorRequest.userID, removeAdministratorRequest.moduleID)) {

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
     };*/

    /**
     *
     * @param isAdministratorRequest
     */
    spaces.isAdministrator = function (isAdministratorRequest) {
        // check if module exists
        Space.findOne({'moduleID': isAdministratorRequest.moduleID}, function (err, result) {
            if (err) {
                //console.error(err);
                isAdministratorRequest.callback(err);
            } else if (result == null) {
                isAdministratorRequest.callback(new Error("NoSuchBuzzSpaceException"));
            } else {
                // check if the user specified by isAdministratorRequest.userId is in the admin group for this buzz space
                var index = result.adminUsers.map(function (admin) {
                    return admin.id;
                }).indexOf(parseInt(isAdministratorRequest.userID, 10) || isAdministratorRequest.userID);

                // this user is not an admin for this buzz space
                if (index === -1) {
                    isAdministratorRequest.callback(null, false);
                } else {
                    isAdministratorRequest.callback(null, result);
                }
            }
        });
    };

	/**
	*
	* @param getProfileForUserRequest
	*/
	spaces.getProfileForUser = function (getProfileForUserRequest) {
		SpaceProfile.findOne({"userID": getProfileForUserRequest.userID}, function (err, result) {
			//User id is sent through and findOne returns object of user with all users info
			if (err) {
				console.error(err);
				getProfileForUserRequest.callback(err);
			}
			else {
				//return result;
				getProfileForUserRequest.callback(null, result);
			}
		});
	};
	
	/**
	*
	* @param registerOnBuzzSpaceRequest
	*/
	spaces.registerOnBuzzSpace = function (registerOnBuzzSpaceRequest) {
		// check if buzz space exists    
		Space.findOne({"moduleID": registerOnBuzzSpaceRequest.moduleID}, function (err, result) {
			if(err) {
				registerOnBuzzSpaceRequest.callback(err);
			} else if (result == null) {
				// module does not exist
				console.log("Buzz space does not exist");
				registerOnBuzzSpaceRequest.callback(new Error("NoSuchBuzzSpaceException"));
			} else {
				// check if space is active
				if (result.isOpen === true || result.isOpen === "true") {
					// check also if profile exists
					SpaceProfile.findOne({"userID": registerOnBuzzSpaceRequest.userID}, function (err1, result1) {
						if (err1) {
							registerOnBuzzSpaceRequest.callback(err1);
						} else if (result1 == null) {
							// create new profile
							var newSpaceProfile = new SpaceProfile({
								userNameForBuzzSpace: registerOnBuzzSpaceRequest.userNameForBuzzSpace,
								signature: registerOnBuzzSpaceRequest.signature,
								userID: registerOnBuzzSpaceRequest.userID,
								moduleID: registerOnBuzzSpaceRequest.moduleID
							});
							
							newSpaceProfile.save(function (err2, result2) {
								if (err) {
									registerOnBuzzSpaceRequest.callback(err2);
								} else {
									console.log("Profile registered successfully");
									//registerOnBuzzSpaceRequest.callback(null, result2);
									registerOnBuzzSpaceRequest.callback(null, "Profile created successfully");
								}
							});
						} else {
							console.log("Space profile already exists");
							registerOnBuzzSpaceRequest.callback(null, result1);
						}
					});
				} else {
					console.log("Buzz space is not active");
					registerOnBuzzSpaceRequest.callback(new Error("BuzzSpaceNotActiveException"));
				}
			}
		});
	} 	

	return spaces;
};

module.exports['@require'] = ['database'];
module.exports['@literal'] = false;