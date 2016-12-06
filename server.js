var http = require('http'),
    fs = require('fs');

http.createServer(function (req, res) {
    switch (req.url) {
        case '/send':
            res.end('OK');
            break;
        default:
            res.end();
    }
}).listen(3000);