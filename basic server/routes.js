const fs = require('fs');

const routeHandler = (request, response) => {
  const urlPath = request.url;
  const requestType = request.method;

  if (urlPath === '/') {
    let loginFormHtml = getLoginForm();
    response.setHeader('Content-Type', 'text/html');
    response.write(loginFormHtml);
    return response.end();

  } else if (urlPath === '/auth' && requestType === 'POST') {

  	let data = [];

  	request.on('data', (chunk) => {
  		data.push(chunk);
  	});

  	request.on('end', () => {
  		const parsedData = Buffer.concat(data).toString();
  		fs.writeFile('data.txt', parsedData, (error) => {
  			response.statusCode = 200;
		  	response.setHeader('Content-Type', 'text/html');
		  	response.write('<h1>Your data has been recorded.</h1>');
		  	response.end();
  		});
  		
  	});
  }
};

function getLoginForm() {
  return `<html>
	 		<head><title>Login</title></head>
		 	<body><form action="/auth" method="POST">
		 	<label>Username: </label> <input type="text" name="username" required/><br/>
		 	<label>Password: </label> <input type="password" name="password" required/><br/>
		 	<input type="submit" value="Login"/>
		 	</form></body>
		 	</html>`;
}

// module.exports = routeHandler;
// module.exports = {
// 	handler: routeHandler,
// 	description: 'This will handle routes.'
// }

exports.handler = routeHandler;