var static = require('node-static');
var file = new static.Server('./public', {cache:0});

var instalations = [
	'nordictable',
	'test'
]
require('http').createServer(function (request, response) {
	
	if(request.url == '/'){
		response.writeHead(302,	{Location: instalations[0] + '/station'});
		response.end();
		return;
	}
	
	if(request.url.substr(request.url.length - 1) == '/'){
		response.writeHead(302,	{
			Location: request.url.substring(0, request.url.length - 1)
		});
		response.end();
		return;
	}
	for (var i = 0; i < instalations.length; i++) {
		instalations[i]
		if(request.url == '/'+instalations[i]){
			response.writeHead(302,	{Location: instalations[i] + '/station'});
			response.end();
			return;
		}
	};
	
	request.addListener('end', function () {
		file.serve(request, response);
	}).resume();

}).listen(process.env.VCAP_APP_PORT || process.env.PORT || 8080);