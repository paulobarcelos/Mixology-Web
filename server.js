var static = require('node-static');
var file = new static.Server('./public', {cache:0});

require('http').createServer(function (request, response) {
	if(request.url.substr(request.url.length - 1) == '/'){
		response.writeHead(302,	{
			Location: request.url.substring(0, request.url.length - 1)
		});
		response.end();
		return;
	}
	if(request.url == '/'){
		response.writeHead(302,	{Location: 'test/station'});
		response.end();
		return;
	}
	if(request.url == '/nordic'){
		response.writeHead(302,	{Location: 'nordic/station'});
		response.end();
		return;
	}
	
	request.addListener('end', function () {
		file.serve(request, response);
	}).resume();

}).listen(process.env.VCAP_APP_PORT || process.env.PORT || 8080);