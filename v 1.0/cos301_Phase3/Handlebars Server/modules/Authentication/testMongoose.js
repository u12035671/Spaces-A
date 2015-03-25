/**
 * Created by Jaco-Louis on 2015/03/25.
 */

var mongoose = require('mongoose');
var sp = require('../Database/connect.js');
// Schema
var authSchema = mongoose.Schema({
    methodName: String,
    statusPoints : String
})
// Add method to schema
authSchema.methods.speak = function () {
    var moduleName = this.name
        ? "Module name is " + this.name
        : "I don't have a name"
    //console.log(moduleName);
}

// Compile schema into a model (class that constructs documents)
var Auth = mongoose.model('Authorization', authSchema);
// end schema


exports.saveMe = function()
{

    var oneObj = new Auth({methodName : 'aa', statusPoints: 'bb'});
    oneObj.save(function (err, cosTest) {
        if (err) return console.error(err);
        console.log("Saved auth to db");

    })
};
/*
var newBuzzSpace = new Space({academicYear:academicYear,isOpen:isOpen,moduleID:moduleID,name:name,adminUsers:adminUsers});
newBuzzSpace.save(function (err, cosTest) {
    if (err) return console.error(err);

    Space.find(function (err, spaces) {
        if (err) return console.error(err);
        //console.log(spaces);
    })
    */