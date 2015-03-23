/**
 * Created by Jaco-Louis on 2015/03/17.
 */
/*
    This module will be used to create and close various Buzz Spaces
 */

var mongoose = require('mongoose');
var sp = require('../Database/connect.js');
// Schema
//===================Simple testing using a schema example
// Create schema
var spacesSchema = mongoose.Schema({
    name: String,
    academicYear: String,
    isOpen: String,
    moduleID: String

    //academicYear,isOpen,moduleID,name,adminUsers

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
// create object of type Space
//var cosTest = new Space({ name: 'test3' });
//cosTest.speak();

/*cosTest.save(function (err, cosTest) {
 if (err) return console.error(err);
 cosTest.speak();
 });*/

// Display all in Spaces model
Space.find(function (err, spaces) {
    if (err) return console.error(err);
    //console.log(spaces);
})

// end schema

function isAuthorized(userId, moduleId) { return true; };

exports.closeBuzzSpace = function (userId, moduleId) {
	var obj = {};
	// check if space exists
	Space.findOne({moduleID:moduleId}, function (err, result) {
		if (err) {
			throw new Error("NoSuchBuzzSpaceException");
		} else {
			// check if user is an admin for buzz space
			if (isAuthorized(userId, moduleId)) {
                if(result == null)
                {
                    // Module does not exist
                    console.log("Did not found space that should be closed");
                }
                else
                {
                    //else module exists, update
                    console.log("Found space that should be closed");
                    result.isOpen = false;

                    result.save(function (err) {
                        //res.send(result);
                    });

                }


			} else {
				throw new Error("NotAuthorizedException");
			}
			obj = result;
		}
	});
	
	return obj;
};


exports.createBuzzSpace = function (academicYear,isOpen,moduleID,name,adminUsers) {
    var newBuzzSpace = new Space({academicYear:academicYear,isOpen:isOpen,moduleID:moduleID,name:name,adminUsers:adminUsers});
    //check if the module exists
    Space.findOne({moduleID:moduleID}, function (err,result) {
        //console.log("result: " +  result);
        if (result == null) {
            console.log("Buzz space not yet created, able to insert");
            newBuzzSpace.save(function (err, cosTest) {
                if (err) return console.error(err);


                Space.find(function (err, spaces) {
                    if (err) return console.error(err);
                    console.log(spaces);
                })
            });
        }
        else{
            console.log("Buzz space already exists");

            Space.find(function (err, spaces) {
                if (err) return console.error(err);
                console.log(spaces);
            })
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
    Space.find({'moduleID':moduleID},function (err,result) {
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
	Space.find({'moduleID':moduleID},function (err, result) {
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