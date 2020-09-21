const http = require('http');
const fs = require('fs');

const server = http.createServer((request, response) => {
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
  		fs.writeFileSync('data.txt', parsedData);
  		response.statusCode = 200;
	  	response.setHeader('Content-Type', 'text/html');
	  	response.write('<h1>Your data has been recorded.</h1>');
	  	response.end();
  	});
  }
});

server.listen(5000, () => {
  console.log('Server is running...');
});

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
