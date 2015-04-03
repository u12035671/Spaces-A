/**
 * Created by collins on 2015/03/24.
 */
var assert = require('assert');
var ldap = require('ldapjs');

var session = require('client-sessions');
var base = 'ou=Computer Science,o=University of Pretoria,c=ZA';
var userObject;
var found = false;

var csds = {};


/********************* Login ******************/
var client;
var results;

csds.state = true;

csds.useModules = function(username,st)
{
    if(st)
    {
        console.log('==Modules Results==');
        client.unbind();
        console.log(username);
    }else{
        client = ldap.createClient({url: 'ldap://reaper.up.ac.za:'});
        UModules.findUserModules(username,this.useModules,client);
    }
};

csds.activeModules = function(data,st)
{
    if(st)
    {
        console.log('==Active Modules Results==');
        client.unbind();
        console.log(data);
    }else{
        client = ldap.createClient({url: 'ldap://reaper.up.ac.za:'});
        AModules.findActiveModules(this.activeModules,client);
    }
};

csds.login = function(username,password,st)
{
    if(st)
    {
        console.log('==Login Results==');
        client.unbind();

        if(password == 200) {
            csds.state = false;
            csds.data = username;
            session.response = username;

            require('./LoginResponse');
            csds.useModules(username.uid, false);
            //csds.activeModules('',false);
        }else{
            require('./LoginResponse');
        }
    }else {
        client = ldap.createClient({url: 'ldap://reaper.up.ac.za:'});
        LSearch.findUser(username,password,this.login,client);
    }
};

/********************* Login Search ******************/
var dn = 'this should be something else';

function setDnTest(string)
{
    dn = string;
}

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
};

/***************** Users with module *********************/

csds.findUserModules = function(memberUid,fun,client)
{
    var opts = {
        filter: '(&(cn=*stud_*)(memberUid='+memberUid+')(objectClass=top))',
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
};

/************************* Active Modules  ****************************/
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
};

/********************** Export ***********************************/

module.exports = csds;