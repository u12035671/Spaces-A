var connect = require('database');
/*Schema Definition Start*/
var mongoose = connect.mongoose;
var authSchema = new mongoose.Schema({
    methodName: String,
    StatusPoints: String},
    {collection: 'Authorization'});
var auth = mongoose.model('Authorization', authSchema);
/*Schema Definition End*/

var Authorization = {};

Authorization.updateAuthorizationRestriction=function(UpdateAuthReq)//The  updateAuthorizationRestriction function
{
    console.log('in updateAuthorisationRestriction');
    var isAuthreq = new isAuthorizedRequest(UpdateAuthReq.getUserID(), UpdateAuthReq.getAuthorizationRestriction().getServiceRestriction().getServiceRestrictionServiceIdentifier());
    /*if (!this.isAuthorized(isAuthreq))
    {
        throw new Error("NotAuthorizedEcxeption");
    }
    else
    {*/
        console.log('Hello ' +  UpdateAuthReq.getAuthorizationRestriction().getServiceRestriction().getServiceRestrictionMinimumStatusPoints());

        //console.log('Hello ' + UpdateAuthReq.getAuthorizationRestriction().getServiceRestriction().getServiceRestrictionServiceIdentifier().getServiceIdentifierMethodName());

        auth.findOneAndUpdate(
            {"methodName": UpdateAuthReq.getAuthorizationRestriction().getServiceRestriction().getServiceRestrictionServiceIdentifier().getServiceIdentifierMethodName()},
            {
                "$set": {
                    "StatusPoints": UpdateAuthReq.getAuthorizationRestriction().getServiceRestriction().getServiceRestrictionMinimumStatusPoints()
                }
            },
            function (err, doc) {
                if (err) {
                    console.log("Method name not found");
                    return false;
                } else {
                    mongoose.connection.close();
                    return true;
                }
            });

    //}
};



///////////////////////////////Update Authorisation restriction request class and functions///////////////////////////////////////////////////
var UpdateAuthorizationRestrictionRequest;
UpdateAuthorizationRestrictionRequest =function(userID, AuthorizationRestriction)
{
    this.userID = userID;
    this.AuthorizationRestriction=AuthorizationRestriction;
};
UpdateAuthorizationRestrictionRequest.prototype.getUserID=function()
{
    return this.userID;
};
UpdateAuthorizationRestrictionRequest.prototype.setUserID=function(userID)
{
    this.userID=userID;
};
UpdateAuthorizationRestrictionRequest.prototype.setAuthorizationRestriction=function(AuthorizationRestriction)
{
    this.AuthorizationRestriction=AuthorizationRestriction;
};
UpdateAuthorizationRestrictionRequest.prototype.getAuthorizationRestriction=function()
{
    return this.AuthorizationRestriction;
};

//////////////////////////////////End of Update Authorisation restriction request class and functions///////////////////////////////////////////////////////



///////////////////////////////Update Authorisation restriction result class and functions///////////////////////////////////////////////////
var UpdateAuthorizationRestrictionsResult=function()
{
    var  AuthorizationRestriction;
};
///////////////////////////////End of Update Authorisation restriction request class and functions///////////////////////////////////////////////////





///////////////////////////////RemoveAuthorisationRestrictionResult class and functions///////////////////////////////////////////////////
var RemoveAuthorizationRestrictionsResult=function()
{
    var  AuthorizationRestriction;
};
///////////////////////////////End of RemoveAuthorisationRestrictionResult///////////////////////////////////////////////////



Authorization.removeAuthorizationRestriction=function(RemoveAuthorizationReq)//The  removeAuthorisationRestriction function
{
    //var isAuthRequest=new IsAuthorisedRequest();
    // var isAuthResult=new IsAuthorisedResult();

    //var isAuthReq = new isAuthorizedRequest(RemoveAuthorizationReq.getUserID(),RemoveAuthorizationReq.getAuthorizationRestriction().getServiceRestriction().getServiceRestrictionServiceIdentifier());

    var rem = RemoveAuthorizationReq.getAuthorizationRestriction().getServiceRestriction().getServiceRestrictionServiceIdentifier().getServiceIdentifierMethodName();
    var stat = RemoveAuthorizationReq.getAuthorizationRestriction().getServiceRestriction().getServiceRestrictionMinimumStatusPoints();
    console.log('yeye ' + rem);


    //if(this.isAuthorized(isAuthReq))
    //{
        auth.find({ methodName: rem }, function(err)
        {
            if (err) {
                console.log('Method name not found');
                throw err;
            }

            console.log('Restriction has been deleted!');

        }).remove().exec();
    /*}
    else
    {
        throw new Error("Not authorized to remove");
    }*/



};


///////////////////////////////RemoveAuthorisationRestrictionResult class and functions//////////////////////////
var RemoveAuthorizationRestrictionsResult = function () {
    var AuthorizationRestriction;
};
//////////////////////End of RemoveAuthorisationRestrictionResult class and functions//////////////////////////


//////////////////////////////RemoveAuthorisationRestrictionRequest class and functions//////////////////////////////////////////
var RemoveAuthorizationRestrictionRequest;
RemoveAuthorizationRestrictionRequest = function(userID,_AuthorizationRestriction)
{
    this.userID = userID;
    this.AuthorizationRestriction=_AuthorizationRestriction;
};
RemoveAuthorizationRestrictionRequest.prototype.getUserID=function()
{
    return this.userID;
};
RemoveAuthorizationRestrictionRequest.prototype.setUserID=function(_userID)
{
    this.userID=_userID;
};
RemoveAuthorizationRestrictionRequest.prototype.setAuthorizationRestriction=function(_AuthorizationRestriction)
{
    this.AuthorizationRestriction=_AuthorizationRestriction;
};
RemoveAuthorizationRestrictionRequest.prototype.getAuthorizationRestriction=function()
{
    return this.AuthorizationRestriction;
};

///////////////////////////////End of RemoveAuthorisationRestriction request class and functions///////////////////////////////////////////////

//////////////////////////////AddAuthorizationRestrictionRequest class and functions////////////////////////////////////
var AddAuthorizationRestrictionRequest;
AddAuthorizationRestrictionRequest = function(_userID, _AuthorizationRestriction)
{
    this.AuthorizationRestriction=_AuthorizationRestriction;
    this.userID = _userID;
};

AddAuthorizationRestrictionRequest.prototype.getUserID=function()
{
    return this.userID;
};
AddAuthorizationRestrictionRequest.prototype.setUserID=function(_userID)
{
    this.userID=_userID;
};

AddAuthorizationRestrictionRequest.prototype.setAuthorizationRestriction=function(_AuthorizationRestriction)
{
    this.AuthorizationRestriction=_AuthorizationRestriction;
};
AddAuthorizationRestrictionRequest.prototype.getAuthorizationRestriction=function()
{
    return this.AuthorizationRestriction;
};
//////////////////////////////End of AddAuthorizationRestrictionRequest class and functions/////////////////////////////
//////////////////////////////AddAuthorisationRestriction class and functions///////////////////////////////////////////
Authorization.addAuthorizationRestriction=function(AddAuthorizationReq)
{
    var isAuthReq = new isAuthorizedRequest(AddAuthorizationReq.getUserID(),AddAuthorizationReq.getServiceIdentifierObject());


    //if(isAuthorised(isAuthReq))
    //{
        console.log('add Restr ' + AddAuthorizationReq.getAuthorizationRestriction().getServiceRestriction().getServiceRestrictionMinimumStatusPoints());

        var add = new auth;
        add.methodName = AddAuthorizationReq.getAuthorizationRestriction().getServiceRestriction().getServiceRestrictionServiceIdentifier().getServiceIdentifierMethodName();
        add.StatusPoints = AddAuthorizationReq.getAuthorizationRestriction().getServiceRestriction().getServiceRestrictionMinimumStatusPoints();

        add.save(function(err){
            if (!err){
                console.log("Restriction successfully added");
                return true;
            } else {
                console.log(err);
                return false;
            }
        });
    /*}
    else
    {
        throw new error('NotAuthorizedEcxeption');
        return false
    }*/
    //return new AddAuthorizationRestrictionsResult();
};
///////////////////////////////End of AddAuthorisationRestriction class and functions///////////////////////////////////
///////////////////////////////AddAuthorisationRestrictionResult class and functions////////////////////////////////////
var AddAuthorizationRestrictionsResult = function ()
{
    var AuthorizationRestriction;
};
//////////////////////End of AddAuthorisationRestrictionResult class and functions//////////////////////////////////////

///////////////////////////////Authorisation restriction class and functions///////////////////////////////////////////////////
var AuthorizationRestriction;
AuthorizationRestriction=function(serviceRestriction)//used by everyone
{
    this.ServiceRestriction=serviceRestriction;
};
AuthorizationRestriction.prototype.setServiceRestriction=function(ServiceRestriction)
{
    this.ServiceRestriction=ServiceRestriction;
};
AuthorizationRestriction.prototype.getServiceRestriction=function()
{
    return this.ServiceRestriction;
};

///////////////////////////////End of Authorisation restriction class and functions///////////////////////////////////////////////////



///////////////////////////////Service restriction class and functions///////////////////////////////////////////////////
var ServiceRestriction=function(minimumStatusPoints,serviceIdentifier)//used by everyone
{

    this.minimumStatusPoints=minimumStatusPoints;
    this.ServiceIdentifier=serviceIdentifier;
};
ServiceRestriction.prototype.setServiceRestrictionStatusPoints=function(minimumStatusPoints)
{
    this.minimumStatusPoints=minimumStatusPoints;
};
ServiceRestriction.prototype.setServiceRestrictionStatusPoints=function(minimumStatusPoints)
{
    this.minimumStatusPoints=minimumStatusPoints;
};

ServiceRestriction.prototype.setServiceRestrictionServiceIdentifier=function(serviceIdentifier)
{
    this.ServiceIdentifier=serviceIdentifier;
};

ServiceRestriction.prototype.getServiceRestrictionMinimumStatusPoints=function() {
    return this.minimumStatusPoints;
};
ServiceRestriction.prototype.getServiceRestrictionServiceIdentifier=function() {
    return this.ServiceIdentifier;
};


///////////////////////////////End of Service restriction class and functions///////////////////////////////////////////////////






///////////////////////////////Service Identifier class and functions///////////////////////////////////////////////////
var ServiceIdentifier=function(fullyQualifiedInterfaceName,methodName)//used by everyone
{

    this.fullyQualifiedInterfaceName=fullyQualifiedInterfaceName;
    this.methodName=methodName;
};
ServiceIdentifier.prototype.setServiceIdentifierMethodName=function(methodName)
{
    this.methodName=methodName;
};
ServiceIdentifier.prototype.setServiceIdentifierInterfaceName=function(fullyQualifiedInterfaceName)
{
    this.fullyQualifiedInterfaceName=fullyQualifiedInterfaceName;
};
ServiceIdentifier.prototype.getServiceIdentifierMethodName=function()
{
    return this.methodName;
};
ServiceIdentifier.prototype.getServiceIdentifierInterfaceName=function()
{
    return this.fullyQualifiedInterfaceName;
};


///////////////////////////////End of Service Identifier class and functions//////////////////////////////////////////////////




var GetAuthorizationRestrictionRequest;
GetAuthorizationRestrictionRequest = function(userID,_AuthorizationRestriction)
{
    this.userID = userID;
    this.AuthorizationRestriction=_AuthorizationRestriction;
};
GetAuthorizationRestrictionRequest.prototype.getUserID=function()
{
    return this.userID;
};
GetAuthorizationRestrictionRequest.prototype.setUserID=function(_userID)
{
    this.userID=_userID;
};
GetAuthorizationRestrictionRequest.prototype.setAuthorizationRestriction=function(_AuthorizationRestriction)
{
    this.AuthorizationRestriction=_AuthorizationRestriction;
};
GetAuthorizationRestrictionRequest.prototype.getAuthorizationRestriction=function()
{
    return this.AuthorizationRestriction;
};




//**************************getAuthorizationRestriction***************************//
Authorization.getAuthorizationRestrictions = function(getAuthReq)
{
    //this holds the returned (cursor) object which is going to be decoded to get the rest of the information.
    var getAuthorizationRequestResult = getAuthReq.getAuthorizationRestriction().getServiceRestriction().getServiceRestrictionServiceIdentifier().getServiceIdentifierMethodName();
    //console.log('heheheh ' + getAuthorizationRequestResult);

    auth.findOne({methodName: getAuthorizationRequestResult}, function(err, getAuthRestr){
        if(err)
        {
            console.log('Method name not found');
            throw err;
        }
        //console.log('hehe ' + getAuthRestr.methodName + '   '+ getAuthRestr.StatusPoints);
        return getAuthRestr;


    });


};
//***********************************end************************************//


////////////////////////////test update////////////////////////////////////
Authorization.updateAuthRestriction = function()
{
    console.log('you there ');
    var sIdentifier=new ServiceIdentifier("Authorization","closeThread");
    console.log('you there 2 ' + sIdentifier);
    var serviceRestriction=new ServiceRestriction(3006, sIdentifier);
    var authRestriction=new AuthorizationRestriction(serviceRestriction);
    var updateAuth=new UpdateAuthorizationRestrictionRequest("u12118282",authRestriction);
    Authorization.updateAuthorizationRestriction(updateAuth);
    //var auth=new Authorization;
    //auth.updateAuthorizationRestriction(updateAuth);
}
///////////////////////////test end//////////////////////////////////



//////////////////////////////test add////////////////////////////////////
Authorization.addAuthRestriction = function()
{
    //var sIdentifier = new ServiceIdentifier("Authorization", "addAuthorizationRestriction");
    var sIdentifier = new ServiceIdentifier("Authorization", "addSpaces");
    console.log('test add ' + sIdentifier);
    var serviceRestriction = new ServiceRestriction(48054, sIdentifier);
    var authRestriction = new AuthorizationRestriction(serviceRestriction);
    var addAuth = new AddAuthorizationRestrictionRequest("u13397134", authRestriction);
    Authorization.addAuthorizationRestriction(addAuth);

}
///////////////////////////test add end//////////////////////////////////

//////////////////////////////test remove////////////////////////////////////
Authorization.removeAuthRestriction = function()
{
    var sIdentifier = new ServiceIdentifier("Authorization", "removeAuthorizationRestriction");
    var serviceRestriction = new ServiceRestriction(6, sIdentifier);
    var authRestriction = new AuthorizationRestriction(serviceRestriction);
    var removeAuth = new RemoveAuthorizationRestrictionRequest("u1223O83O", authRestriction);
    Authorization.removeAuthorizationRestriction(removeAuth);
}
/////////////////////////test remove end//////////////////////////////////


//////////////////////////////test get////////////////////////////////////
Authorization.getAuthRestriction = function()
{
    var sIdentifier = new ServiceIdentifier("Authorization", "getThread");
    var serviceRestriction = new ServiceRestriction(0, sIdentifier);
    var authRestriction = new AuthorizationRestriction(serviceRestriction);
    var getAuth = new GetAuthorizationRestrictionRequest("u1223O83O", authRestriction);
    Authorization.getAuthorizationRestrictions(getAuth);
}
/////////////////////////test remove get//////////////////////////////////


/*
* class buzzAuthorization has a function prototype called isAuthorized.
*/
//#START isAuthorized
//buzzAuthorization = function(){

//};


/*
* isAuthorizedRequest inherits from buzzAuthorization has one virable and two objects:
* 	- userid: virable
*	- serviceIdentifierOject: ServiceIdentifier
*	- contextInfo: Map from generic
*/
//////////////////////////////isAuthorizedRequest class and functions////////////////////////////////////
var isAuthorizedRequest = function(userID, _serviceIdentifierObject)
{
    this.userid = userID;
    this.serviceIdentifierObject = _serviceIdentifierObject;
    //var contextInfo = new Map();
};

isAuthorizedRequest.prototype.getUserID =function()
{
    return this.userid;
};
isAuthorizedRequest.prototype.getServiceIdentifierObject=function()
{
    return this.serviceIdentifierObject;
};

isAuthorizedRequest.prototype.setUserID=function(_userID)
{
    this.userID=_userID;
};

isAuthorizedRequest.prototype.setAuthorizationRestriction=function(_AuthorizationRestriction)
{
    this.AuthorizationRestriction=_AuthorizationRestriction;
};
isAuthorizedRequest.prototype.getAuthorizationRestriction=function()
{
    return this.AuthorizationRestriction;
};
//////////////////////////////End of isAuthorizedRequest class and functions/////////////////////////////






/*
 * isAuthorizedRequest inherits from buzzAuthorization has one virable and two objects:
 * 	- userid: virable
 *	- serviceIdentifierOject: ServiceIdentifier
 *	- contextInfo: Map from generic
 */

var isAuthorizedRequest = function(userID, serviceIdentifierObject)
{
    var userid;
    var serviceIdentifierOject;

    this.userid = userID;
    this.serviceIdentifierOject = serviceIdentifierObject;
    //var contextInfo = new Map();
};

isAuthorizedRequest.prototype.getUserID =function()
{
    return this.userid;
};
isAuthorizedRequest.prototype.getisAuthorizedRequestServiceRestrictionOject=function()
{
    return this.serviceIdentifierOject;
};



/*
 * BuzzAuthorization connects to the database compares status poits from status and returns true if
 * the status point in Buzz is less than that retrieved from status false otherwise.
 *
 * isAuthorized receieve and object of isAuthorizedrequest which has an object of serviceidentifier
 * and a userid..
 */

Authorization.isAuthorized = function(isauthorizedRequest)
{

    if(isauthorizedRequest != null)
    {
        var boolisAuthorized = false;
        var getStatusProfilevalue;
// 				var sIdentifier=new ServiceIdentifier("Authorization","addAuthorisationRestriction");

//         			var request  = new isAuthorizedRequest(isauthorizedRequest, sIdentifier);

        var AuthorizationRestrictionsMethodName = isauthorizedRequest.getisAuthorizedRequestServiceRestrictionOject().getServiceRestrictionServiceIdentifier().getServiceIdentifierMethodName();
        isauthorizedRequest.getisAuthorizedRequestServiceRestrictionOject()
        console.log('yikes ' + AuthorizationRestrictionsMethodName);

        /*var mongoose;
        mongoose= require('mongoose');
        var authSchema = new mongoose.Schema({
            methodName: String,
            StatusPoints: String
        }, {collection: 'Authorization'});
        var auth = mongoose.model('Authorization', authSchema)
        console.log("OK going...");*/
        auth.findOne({"methodName": AuthorizationRestrictionsMethodName},function (err, doc){
            if (err)
            {
                console.log("Method name not found");
            }
            else
            {
                console.log("Connection success...");

                if(doc != null)
                {
                    boolisAuthorized = true;

                    //var point = parseInt(doc.StatusPoints)
                    //console.log(point);
                    /*
                     * call getStatusForProfile from status and parse in the isAuthorizedRequest as a parameter
                     * it is a userId.
                     */				//getStatusProfilevalue = new getStatusForProfile(isauthorizedRequest.getUserID());

                    /*if((getStatusProfilevalue > point))
                    {
                        //console.log("*** " + doc);
                        //console.log("Authentication done...");
                        boolisAuthorized = true;
                    }
                    else
                    {
                        //console.log("Authentication NOT done...");
                        boolisAuthorized = false;
                    }*/
                }
                else
                {
                    boolisAuthorized = false;
                }

                mongoose.connection.close();
                return boolisAuthorized;
            }
        });
    }

    return false;

}

//#END isAuthorized -----------------------


//#BEGIN isAuthorized Test-----------------------
Authorization.checkAuthorized = function()
{
    console.log('you there ');
    var sIdentifier=new ServiceIdentifier("Authorization","closeThread");
    var serviceRestriction=new ServiceRestriction(36, sIdentifier);
    var checkAuth=new isAuthorizedRequest("u12118282",serviceRestriction);
    Authorization.isAuthorized(checkAuth);

}
//#END isAuthorized Test-----------------------


module.exports = Authorization;
module.exports.ServiceIdentifier = ServiceIdentifier;
module.exports.ServiceRestriction = ServiceRestriction;
module.exports.AuthorizationRestriction = AuthorizationRestriction;
module.exports.UpdateAuthorizationRestrictionRequest = UpdateAuthorizationRestrictionRequest;
//module.exports.Authorization.updateAuthorizationRestriction = Authorization.updateAuthorizationRestriction;

