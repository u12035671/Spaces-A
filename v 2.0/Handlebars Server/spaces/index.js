exports = module.exports = function(database, notification, spaces, csds, authentication) {
    var express = require('express');
    var router = express.Router();
    var mongoose = database.mongoose;

    /***** TopLevel Demo ***********/
    var spaceDemoSchema = mongoose.Schema({
        space_ID: String,
        space_Name: String,
        space_Description: String
    }, {
        collection: 'Spaces'
    });
    var threadDemoSchema = new mongoose.Schema({
        thread_DateCreated: Date,
        thread_Name: String,
        thread_PostContent: Array,
        thread_CreatorID: String,
        thread_SpaceID: String,
        thread_StatusID: Array,
        thread_Parent: String,
        thread_Archived: Date,
        thread_Attachments: Array,
        thread_PostType: String,
        thread_Closed: Boolean,
        thread_DateClosed: Date
    },{
        collection: 'Threads'
    });


    function getProfile(id) {
        return {title: "user " + id};
    }
    function getThreads(id, callback) {
        var threadModel = mongoose.model("Threads_1", threadDemoSchema);
        threadModel.find({thread_SpaceID: id}, function (err, threads) {
            if (err) {
            }
            else {
                var newData = {};
                newData.title = id;
                newData.threads = threads;
                callback(newData);
            }
        });
    }
    function getSpaces(callback) {
        var spaceModel = mongoose.model('Spaces_1', spaceDemoSchema);
        spaceModel.find({}, function (err, spaces) {
            if (err) {

            }
            else {
                callback(spaces);
            }
        });
    }

    router.get('/', function (req, res, next) {
        //Pass to page
        getSpaces(function (obj2) {
            var obj = {};
            obj.spaces = obj2;
            obj.title = "Buzz++@UP";
            //console.log(obj);
            res.render('index', obj);
        })
    });
    router.get('/blank', function (req, res, nect) {
        res.render('blank', {title: "Content Unavailable"});
    });
    router.get('/demothreads', function (req, res, next) {
        var space = req.query.space;
        getThreads(space, function (obj) {

            // console.log(obj);
            res.render('threadDemo', obj);
        })
    });
    //Eg use get arguments from URL
    router.get('/testing', function (req, res, next) {
        res.render('test', getProfile(req.query.id));
    });

    /****** Infrastructure Routing *****/

    //create space
    router.get('/createSpace', function(req, res, next) {
        res.render('./dynamic_views/createSpace', {"title":"Create Space"});
    });

    //Close space
    router.get('/closeSpace', function(req, res, next) {
    //Pass to page
      res.render('./dynamic_views/closeSpace');
    });

    //Show infrastructure page
    router.get('/infrastructure', function(req, res, next) {
        //Pass to page
        res.render('infrastructure', {modules: '','title':'Infrastructure integration'});
    });

    //Admin management
    router.get('/adminManagement', function(req, res, next) {
    //Pass to page
      res.render('./dynamic_views/adminManagement');
    });

    router.post('/submitCS', function(req, res, next){
        /*
        console.log("test ["+req.body.CSyear+"]");
        console.log("test ["+req.body.CSmodule+"]");
        console.log("test ["+req.body.CSname+"]");
        */
        var obj ={};
            obj.academicYear=req.body.CSyear;
            obj.isOpen = true;
            obj.moduleID = req.body.CSmodule;
            obj.name = req.body.CSname;
            obj.adminUsers = [];

        var result = spaces.createBuzzSpace(obj);

        console.log("this is the result " + result);
        res.render('./dynamic_views/createSpace',{message: result});
    });

    router.post('/submitNotify', function(req, res, next){

        var obj ={};
        obj.subN=req.body.subNotify;
            var jsonObj = {
            type : 'follow_Thread',
            threadID: '1',
            studentID: 'u34567890'
        };


        var result = notification.notifyRegistration(jsonObj);

        var userAddress="301emailtest@gmail.com";         //Gmail username eg name before @gmail.com
        var userAddressPassword="new301testemail";

        //Gmail password
        var recipientAddress="";   //email address of recipient
        var senderAddress="tonia.michael94@gmail.com";  //email address of sender
        var mailSubject="Buzz: Registered for notification"; //Notification subject
        var mailMessage="Registered for notifications";//Message to be sent

        notification.sendNotification(userAddress, userAddressPassword, senderAddress, recipientAddress, mailSubject, mailMessage);


        console.log("this is the result " + result);
        res.render('./notificationViews/notify1',{message: result});
    });

router.get('/notify2', function(req, res, next) {
    //Pass to page
    //var profile = spaces.getProfileForUser();
    res.render('./notificationViews/notifyOptions');
});

router.get('/notify', function(req, res, next) {
    //Pass to page
    res.render('./notificationViews/notify1');
});
router.post('/submitNotifyOptions',function(req, res, next){
    var obj={};
    obj.new1 = req.body.new;
    obj.del1=req.body.del;
    obj.moved1=req.body.moved;
    obj.appReg1=req.body.appReg;
    obj.appDereg1=req.body.appDereg;
    console.log("object new1" +obj.new1);
    console.log("obj delete"+obj.del1);
    if(obj.new1=="Y"){
        var jsonObj = {
            threadID : '0'
        }
        var result =  notification.notifyDeletedThread(jsonObj);
        var userAddress="301emailtest@gmail.com";         //Gmail username eg name before @gmail.com
        var userAddressPassword="new301testemail";

//Gmail password
        var recipientAddress="";   //email address of recipient
        var senderAddress="tonia.michael94@gmail.com";  //email address of sender
        var mailSubject="Buzz: Registered for notification"; //Notification subject
        var mailMessage="Registered for notifications regarding the creation of threads on this post";//Message to be sent

        notification.sendNotification(userAddress, userAddressPassword, senderAddress, recipientAddress, mailSubject, mailMessage);
    }
    else if(obj.del1=="Y"){
        var jsonObj = {
            threadID : '0'
        }
        var result =  notification.notifyDeletedThread(jsonObj);

        var userAddress="301emailtest@gmail.com";         //Gmail username eg name before @gmail.com
        var userAddressPassword="new301testemail";

//Gmail password
        var recipientAddress="";   //email address of recipient
        var senderAddress="tonia.michael94@gmail.com";  //email address of sender
        var mailSubject="Buzz: Registered for notification"; //Notification subject
        var mailMessage="Registered for notifications regarding the deletion of threads on this post";//Message to be sent

        notification.sendNotification(userAddress, userAddressPassword, senderAddress, recipientAddress, mailSubject, mailMessage);
    }
    else if(obj.moved1=="Y"){
        var jsonObj = {
            threadID : '0'
        }
        var result = notification.notifyMovedThread(jsonObj);

        var userAddress="301emailtest@gmail.com";         //Gmail username eg name before @gmail.com
        var userAddressPassword="new301testemail";

//Gmail password
        var recipientAddress="";   //email address of recipient
        var senderAddress="tonia.michael94@gmail.com";  //email address of sender
        var mailSubject="Buzz: Registered for notification"; //Notification subject
        var mailMessage="Registered for notifications regarding the moving of threads on this post";//Message to be sent

        notification.sendNotification(userAddress, userAddressPassword, senderAddress, recipientAddress, mailSubject, mailMessage);
    }
    else if(obj.appReg1=="Y"){
        var jsonObj = {
            appraisalType : 'Funny',
            studentID : 'u34567890'
        }
        var result = notification.appraisalRegister(jsonObj);

        var userAddress="301emailtest@gmail.com";         //Gmail username eg name before @gmail.com
        var userAddressPassword="new301testemail";

//Gmail password
        var recipientAddress="";   //email address of recipient
        var senderAddress="301emailtest@gmail.com";  //email address of sender
        var mailSubject="Buzz: Registered for notification"; //Notification subject
        var mailMessage="Registered for appraisals notifications";//Message to be sent

        notification.sendNotification(userAddress, userAddressPassword, senderAddress, recipientAddress, mailSubject, mailMessage);

    }
    else if(obj.appDereg1=="Y"){
        var jsonObj = {
            appraisalType : 'Funny',
            studentID : 'u34567890'
        }
        var result = notification.appraisalDeregister(jsonObj);

        var userAddress="301emailtest@gmail.com";         //Gmail username eg name before @gmail.com
        var userAddressPassword="new301testemail";

//Gmail password
        var recipientAddress="";   //email address of recipient
        var senderAddress="tonia.michael94@gmail.com";  //email address of sender
        var mailSubject="Buzz: Registered for notification"; //Notification subject
        var mailMessage="Deregistered for appraisal notifications";//Message to be sent

        notification.sendNotification(userAddress, userAddressPassword, senderAddress, recipientAddress, mailSubject, mailMessage);
    }
    res.render('./notificationViews/notifyOptions',{message:result});
});
    router.post('/submitRS', function(req, res, next){
        //console.log("test ["+req.body.RSmodule+"]");
        //console.log("test ["+req.body.RSid+"]");
        var obj = {};
            obj.moduleID = req.body.subNotify;

        var result = spaces.closeBuzzSpace(obj);

        res.render('./dynamic_views/closeSpace',{message: result});
    });

    router.post('/submitAAM', function(req, res, next){
        //console.log("test ["+req.body.Aadmin+"]");
        //console.log("test ["+req.body.AAid+"]");
        var obj = {};
            obj.moduleID = req.body.Aadmin;
            obj.userID = req.body.AAid;

        var result = spaces.assignAdministrator(obj);

        /*This should not use render, you want to send json data back
        * I think the correct function is send
        */
        res.render('./dynamic_views/adminManagement',{message: result});
    });

    router.post('/submitRAM', function(req, res, next){
        //console.log("test ["+req.body.Radmin+"]");
        //console.log("test ["+req.body.AAid+"]");
        var obj = {};
            obj.moduleID = req.body.Radmin;
            obj.userID = req.body.RAid;

        var result = spaces.removeAdministrator (obj);
        res.render('./dynamic_views/adminManagement',{message: result});
    });

router.get('/registerUser', function(req, res, next) {
//Pass to page
  res.render('./dynamic_views/registerUser');
});

router.post('/submitRU', function(req, res, next){
	/*
	console.log("test ["+req.body.RUuserName+"]");
	console.log("test ["+req.body.RUsignature+"]");
	console.log("test ["+req.body.RUuserid+"]");
	console.log("test ["+req.body.RUmoduleid+"]");
	*/
	var obj ={};
		obj.userNameForBuzzSpace=req.body.RUuserName;
		obj.signature=req.body.RUsignature;
		obj.userID=req.body.RUuserid;
		obj.moduleID=req.body.RUmoduleid;
		
	var result = spaces.createBuzzSpace(obj);
	
	//console.log("this is the result " + result);
	res.render('./dynamic_views/registerUser',{message: result});
});


    var authSchema = mongoose.Schema({
            methodName: String,
            moduleID: String,
            roleName: String,
            StatusPoints: Number},
        {collection: 'Authorization'});


    function getRestrictions(callback) {
        var auth = mongoose.model('Authorization', authSchema);
        //auth.find().select('methodName - _id');
        auth.find({}, 'methodName', function (err, restrictions) {
            if (err) {
                console.log('unable to find list');
            }
            else {
                callback(restrictions);
            }
        });
    }

    router.get('/getRestrictions', function(req, res) {

        getRestrictions(function (restr) {
            var rest = {};
            rest.list = restr;
            rest.title = 'Authorization Restrictions List';

            res.render('./auth_views/authorization', rest);
        })

    });

    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    router.get('/csLogin', function(req, res, next) {

        res.render('./csdsView/login');
    });

    router.post('/submitCSDS', function(req, res, next){

        var obj = {};
        obj.usmemberID = req.body.csdsUsername;
        obj.userPassword = req.body.csdsPassword;

        Login(obj,res);
    });

    function Login(obj,result)
    {
        csds.login(obj.usmemberID,obj.userPassword,function(res)
        {
            if(res === true)
            {
                FindUserModules(obj.usmemberID,result);
                //GetUserRolesForModules(obj.usmemberID);
            }
            else {
                result.render('./csdsView/login',{LoginResult: 'Failed to login'});
            }
        });
    }

    function FindUserModules(memberUid,result)
    {
        csds.findUserModules(memberUid,function(res){
            try{
                result.render('./infrastructure',{modules: res});
            }
            catch(err)
            {
                console.log(err);
            }
        });
    }

    function GetUserRolesForModules(memberUid)
    {
        csds.getUserRolesForModules(memberUid,function(res){
            try{
                console.log(res);
            }
            catch(err)
            {
                console.log(err);
            }
        });
    }

    function GetActiveModulesForYear()
    {
        csds.getActiveModulesForYear(function(res){
            try{
                console.log(res);
            }
            catch(err)
            {
                console.log(err);
            }
        });
    }

    function GetUsersWithRole(role,moduleCode)
    {
        csds.getUsersWithRole(role,moduleCode,function(res){
            try{
                console.log(res);
            }
            catch(err)
            {
                console.log(err);
            }
        });
    }

    return  router;
};

exports['@literal'] = false;
exports['@require'] = ['buzz-database', 'buzz-notification', 'buzz-spaces', 'buzz-csds', 'buzz-authentication'];
