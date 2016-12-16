var express = require('express');
var http = require('http');
var path = require('path');

var app = express();
app.set('port', 3000);
app.engine('ejs', require('ejs-locals'));
console.log(__dirname)
app.set('views', __dirname + '/template');
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    if (req.url == '/') {
        res.render('index');
    } else {
        next();
    }
});

app.use(function (req, res, next) {
    if (req.url == '/forbidden') {
        next(new Error("Denied"));
    } else {
        next();
    }
});


app.use(function (req, res) {
    res.status(404).send("Page Not Found");
});

var server = http.createServer(app);
server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

var io = require('socket.io').listen(server);

io.use(function (socket, next) {
    socket.handshake.user = 'Gosha';
    next();
});

io.sockets.on('connection', function (socket) {

    socket.on('join', function (user) {
        io.sockets.emit('join', user);
    });
    socket.on('sendMsg', function (opt) {
        io.sockets.emit('receiveMsg', opt);
    });
});



