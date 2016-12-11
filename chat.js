var clients = [];

exports.subscribe = function (req, res) {
    console.log('subscribe');
    clients.push(res);

    res.on('close', function () {
        clients.splice(clients.indexOf(res), 1);
    })
}

exports.publish = function (msg) {
    console.log('publish ' + msg);
    clients.forEach(function (res) {
        res.end(msg);
    });
    clients = [];
}