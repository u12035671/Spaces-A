/**
 * Created by collins on 2015/03/24.
 */
var ldap = require('ldapjs');
var LSearch = require('./LoginSearch');
var UModules = require('./GetUserWithModules');
var AModules = require('./GetActiveModules');
var session = require('client-sessions');
var csds = new Object();
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
}

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
}

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
}

module.exports = csds;
