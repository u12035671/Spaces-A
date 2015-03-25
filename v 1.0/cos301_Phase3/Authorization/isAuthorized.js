
/*
 * Author's Name: William Seloma
 * Student Number: 10155865
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
    
//class isAuthorizedResult 
isAuthorizedResult = function()
{
  
};

    
isAuthorizedResult.prototype.isAuthorized = function(getAuthoizationsRestrictionRequest)
{
// 	  var getAuthoizationsRestrictionRequest = "u12121950";
	  var statusProfileResults;
	  var boolisAuthorized = true;
// 	  var MongoClient = require('mongodb').MongoClient;
	  
	  if(getAuthoizationsRestrictionRequest != null)
	  {
		statusProfileResults = getStatusForProfile(getAuthoizationsRestrictionRequest);
		
		if(statusProfileResults != null)
		{
			/*MongoClient.connect("mongodb://45.55.154.156:27017/test", function(err, db) 
			{
			  var collection = db.collection('test');
			      */
			      /*
			       * Check if there is a connection error if not, find the ranking depending on it 
			       * set boolisAuthorized to true else false, else if the is an error set boolisAuthorized to false. 
			       */
			/*    if(err)
			      {
				boolisAuthorized = false;
				console.log("Error occured could not connect to the database");
			      }
			      else
			      {
				console.log("Connection success...");
				var resultfound = collection.find({ _id: getAuthoizationsRestrictionRequest});
			      }
			});
			*/
			
			/*
			 * I spoke to one of the status guys he says that getStatusForProfile returns a value from the range of 0 - 3
			 * where 0 is a guest 1 a student, 2 teaching assistant and 3 a lecture and I have to return true or false depending 
			 * on the mentioned values and only a guest is false and the others are all true.
			 *
			 *  Because of this I see no need for me to connect to any database to search anything because getStatusForProfile does 
			 *  all the checking.. 
			 *  @Ruth is this ok
			 */ 
			if(statusProfileResults == 0)
			{
			  boolisAuthorized = false;
			}
		}
			    
	  }
	  
	  
    return boolisAuthorized;
}
