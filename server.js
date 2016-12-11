var http = require('http'),
    fs = require('fs'),
    chat = require('./chat');

function sendFile(fileName, res) {
    var fileStream = fs.createReadStream(fileName);
    fileStream
        .on('error', function () {
            res.statusCode = 500;
            res.end('Server error');
        })
        .pipe(res)
}

var port = process.env.PORT || 5000;
http.createServer(function (req, res) {
    switch (req.url) {
        case '/':
            sendFile('index.html', res);
            break;
        case '/subscribe':
            chat.subscribe(req, res);
            break;
        case '/publish':
            var body = '';

            req
                .on('readable', function () {
                    body += req.read()
                    console.log(req.read())
                })
                .on('end', function () {
                    try {

                        body = JSON.parse(body);
                    } catch (e) {
                        res.statusCode = 400;
                        res.end('Bad request');
                        return;
                    }
                });

            chat.publish(body.message);
            res.end('ok');
            break;
        default:
            res.statusCode = 404;
            res.end('Not found');
    }
}).listen(port);