/**
 * Created by collins on 2015/03/24.
 */
var assert = require('assert');
var base = 'ou=Computer Science,o=University of Pretoria,c=ZA';
var userObject;
var found = false;
var csds = new Object();

function setDnTest(string)
{
    dn = string;
}

var dn = 'this should be something else';
csds.findUser = function(username,password,fun,client)
{
    var Data;
    var opts = {
        filter: 'uid='+username,
        scope: 'sub'
    };

    console.log('searching for user: '+username);
    client.search(base, opts, function (err, res)
    {
        assert.ifError(err);

        res.on('searchEntry', function (entry)
         {
            userObject = JSON.parse(JSON.stringify(entry.object));

            var user = JSON.parse(JSON.stringify(entry.object));
            if(typeof entry.object.dn == "string")
            {
                setDnTest(entry.object.dn);
                found = true;
            }

             if(found) {
                 Data = {'status': 'ok','uid':username};
             }
         });
        res.on('end', function (result)
        {
            if(found)
                return fun(Data,200,true);
            return fun(Data,400,true);
        });
    });
}

module.exports = csds;