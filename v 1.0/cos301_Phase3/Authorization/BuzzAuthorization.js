/*
 * Author's Name: William Seloma
 * Student Number: 10155865
 * 
 * Defined here is the:
 * 	- buzzAuthorization class and classes inheriting from it are:
 * 		- BuzzAuthorization class contains isAuthorized function.
 * 		- isAuthorizedRequest class
 * 		- isAuthorizedResult class
 * 		- ServiceIdentifier class
 * 
 *	- buzzSpaces class and classes inheriting from it are:
 * 		- BuzzSpace class
 * 		- SpaceNotActiveException
 * 
 * 	- generic class and classes inheriting from it
 * 		- Map class
 * 		- Exception class
 * 		- Object class
 *	 
 */

/*
 * Dummy getStatusForProfile has to be removed when intergrating
 */
function getStatusForProfile(getAuthoizationsRestrictionRequest)
{
	var toreturn = 0;
	if(getAuthoizationsRestrictionRequest != null)
	{
	  toreturn = 3;
	}
	
	return toreturn;
}


/*
 * class buzzAuthorization has a function prototype called isAuthorized.
 */
buzzAuthorization = function(){
  
};

/*
 * Class generic has three classes in isAuthorized [serviceContract] inheriting from it:
 * 	- class Map
 * 	- class Exception
 * 	- class Object
 */	

function generic()
{
  
};

/*
 * class Object inherits from generic
 */
generic.prototype.Object = function()
{
  
}

/*
 * class Map inherits from generic has two class Object objects
 * 	- key: Object
 * 	- value: Object
 */

generic.prototype.Map = function()
{
  var key;
  var value;
}

/*
 * class Exception inherits from generic
 */

generic.prototype.Exception = function()
{
  
}

/*
 * Class buzzSpaces has two classes inheriting from it in isAuthorized [serviceContract]:
 * 	- class BuzzSpace
 * 	- class SpaceNotActiveException
 */
function buzzSpaces()
{
  
};



/*
 * BuzzSpace inherits from buzzSpaces in isAuthorized [serviceContract] has three virables:
 * 	- academicYear: Integer
 * 	- isOpen: Boolean
 * 	- moduleId: String
 */

buzzSpaces.prototype.BuzzSpace = function()
{
  var academicYear;
  var isOpen;
  var moduleId;
}

/*
 * SpaceNotActiveException inherits from buzzSpaces has an Exception object
 * called exceptionObject.
 */

buzzSpaces.prototype.SpaceNotActiveException = function()
{
    var exceptionObject = new Exception();
}

/*
 * class isAuthorizedResult inherits from buzzAuthorization, has a method isAuthorized which is
 * boolean it is used by BuzzAuthorization function isAuthorized
 * 
 */
buzzAuthorization.prototype.isAuthorizedResult = function()
{
  var isAuthorized = false;
};

/*
 * ServiceIdentifier inherits from buzzAuthorization
 * It has two virables:
 * 	- fullyQualifiedInterfaceName:String
 * 	- methodName: String
 */

buzzAuthorization.prototype.ServiceIdentifier = function()
{
  var fullyQualifiedInterfaceName; 
  var methodName;
};

/*
 * isAuthorizedRequest inherits from buzzAuthorization has one virable and two objects:
 * 	- userid: virable
 *	- serviceIdentifierOject: ServiceIdentifier
 *	- contextInfo: Map from generic 
 */
buzzAuthorization.prototype.isAuthorizedRequest = function()
{
  var userid;
  var serviceIdentifierOject = new ServiceIdentifier();
  var contextInfo = new Map();
};


    
/*
 * 	BuzzAuthorization class has function isAuthorized it
 * 	returns a isAuthorizedResult object
 * 	
 * 	creates a new object of isAuthorizedResult and alters its contents
 * 	of the object and returns it.
 * 
 */    
buzzAuthorization.prototype.BuzzAuthorization = function()
{
      function isAuthorized(isAuthorizedRequest)
      {
	var statusProfileResults;
	  var isAuthorizedResultObject = new isAuthorizedResult();
	  
	  if(isAuthorizedRequest != null)
	  {
		statusProfileResults = getStatusForProfile(isAuthorizedRequest);
		
		if(statusProfileResults != null)
		{
		  if(statusProfileResults > 0)
		  {
		    //Set isAuthorizedResult object to false
		    isAuthorizedResultObject.isAuthorized = true;
		  }
		}
			    
	  }
	  
	  return isAuthorizedResultObject;
      }
}



