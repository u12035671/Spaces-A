var test = require('./Login');
var session = require('client-sessions');

/*Initialize the session*/
session({
    cookieName: 'session',
    secret: 'random_string_goes_here',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000
});

function main()
{
    console.log("--Testing loggin--");
    test.login('u89000121','Misters',false);
}

main();

