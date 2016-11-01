const http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, Node!\n');
}).listen(8080, '127.0.0.1');

console.log('Server runing at http://localhost:8080');