/**
 * Created by collins on 2015/03/26.
 */
var assert = require('assert');
var base = 'ou=Computer Science,o=University of Pretoria,c=ZA';
var userObject;
var csds = new Object();

csds.findActiveModules = function(fun,client)
{
    var opts = {
        filter: '(cn=lect_*)',
        scope: 'sub'
    };
    client.search(base, opts, function (err, res)
    {
        assert.ifError(err);

        res.on('searchEntry', function (entry)
        {
            //userObject =JSON.parse(JSON.stringify(entry.object)).toString();
            userObject = entry.object;
        });
        res.on('end', function (result)
        {
            return fun(userObject,true);
        });
    });
}

module.exports = csds;