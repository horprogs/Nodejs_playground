var http = require('http'),
    fs = require('fs');

var port = process.env.PORT || 5000;
http.createServer(function (req, res) {
    switch (req.url) {
        case '/send':
            res.end('OK');
            break;
        default:
            res.end('Not found');
    }
}).listen(port);