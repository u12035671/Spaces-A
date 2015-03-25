var http = require("http");
var buzzAuthorizationClasses = require("./GUIbuzzAuthorizationClasses");

http.createServer(function(request, response) 
{  
	response.writeHead(200, {"Content-Type": "text/html"}); 
	var result = buzzAuthorizationClasses.getClass();
	response.write("<!DOCTYPE html>"
				+"<head>"
				+"<meta charset='utf-8'>"
				+"<meta http-equiv='X-UA-Compatible' content='IE=edge'>"
				+"<meta name='viewport' content='width=device-width, initial-scale=1'>"
				+"<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css'>"
				+"<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap-theme.min.css'>"
				+"<script src='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js'></script>"
				+"</head>"
					+"<body>"
						+"<div class='container'>"
							+"<div class='starter-template'>"
							+"<h1>Buzz System</h1>"
							+"<h2>buzzAuthorisation</h2>"
							+"<label for='inputEmail' class='sr-only'>UserId</label><input type='text' id='inputEmail' class='form-control' placeholder='i.e u1234567' required autofocus><br/>"
							+"<p class='lead'>Select a restriction from the dropdown</p>"
								+"<div class='dropdown'>"
									+"<button class='btn btn-default dropdown-toggle' type='button' id='dropdownMenu1' data-toggle='dropdown' aria-expanded='true'>"
									+"Dropdown"
									+"<span class='caret'></span>"
									+"</button>"
									+"<ul class='dropdown-menu' role='menu' aria-labelledby='dropdownMenu1'>"
										+"<li role='presentation'><a role='menuitem' tabindex='-1' href='#'>Action</a></li>"
										+"<li role='presentation'><a role='menuitem' tabindex='-1' href='#'>Another action</a></li>"
										+"<li role='presentation'><a role='menuitem' tabindex='-1' href='#'>Something else here</a></li>"
										+"<li role='presentation'><a role='menuitem' tabindex='-1' href='#'>Separated link</a></li>"
									+"</ul>"
								+"</div>"
								+"<p>"+result+""
								+"<div style='margin-top:20%;>"
									+"<form class='form-inline'>"
										+"<div class='form-group'>"
										+"<label class='sr-only' for='exampleInputEmail3'>Ranking</label>"
										+"<input type='email' class='form-control' id='exampleInputEmail3' placeholder='Ranking'>"
										+"</div>"
										+"<button type='submit' class='btn btn-primary'>Add Restriction</button>"
									+"</form>"
								+"</div>"
								+"<div style='margin-left:10.7%;margin-top:-3%;'>"
									+"<button type='button' class='btn btn-success'>Remove Restriction</button>"
									+"<button type='button' class='btn btn-info'>Update Restriction</button>"
								+"</div>"
							+"</div>"
						+"</div>"
					+"</body>"
			+"</html>");
	response.end();
}).listen(8080);
console.log('Server is listening to http://localhost/ on port 8080…');
