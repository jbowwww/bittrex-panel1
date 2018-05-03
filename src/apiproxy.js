
const inspect = require('util').inspect;
const http = require('http');

const server = http.createServer((req, serverRes) => {
  var url = require('url').parse(req.url);
  var oldUrl = url;
  url.hostname = "bittrex.com";
  serverRes.setHeader('Access-Control-Allow-Origin', '*');
serverRes.removeHeader('apisign');
  http.get(url, (res) => {
	  const { statusCode } = res;
	  const contentType = res.headers['content-type'];
	  delete res.headers.apisign;
	  let error;
	  if (statusCode !== 200) {
	    error = new Error('Request Failed.\n' +
	                      `Status Code: ${statusCode}`);
	  } else if (!/^application\/json/.test(contentType)) {
	    error = new Error('Invalid content-type.\n' +
	                      `Expected application/json but received ${contentType}`);
	  }
	  if (error) {
	    console.error(error.message);
	    // consume response data to free up memory
	    res.resume();
	    return;
	  }
	  console.log(`${oldUrl.href} -> ${url.href}`);

	  res.setEncoding('utf8');
	  let rawData = '';
	  res.on('data', (chunk) => { rawData += chunk; });//serverRes.write(chunk); });
	  res.on('end', () => { serverRes.end(rawData); });
	}).on('error', (e) => {
	  console.error(`Got error: ${e.message}`);
	});
});

server.on('clientError', (err, socket) => {
  var errmsg = 'HTTP/1.1 400 Bad Request\r\n\r\n';
  socket.end(errmsg);
  console.error(errmsg);
});

server.listen(8001, (err) => {
	console.log('listening on ', 'servers=', inspect(server));
});

module.exports = server;
