/**
 * Created by Jaco-Louis on 2015/03/17.
 */
/*
    This module will be used to create and close various Buzz Spaces
 */
exports.closeBuzzSpace = function () {
    return "Space closed";
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