var socket = io(),
    $messages = $('.js-messages'),
    $msgInput = $('.js-msg-input'),
    $msgForm = $('.js-msg-form'),
    $login = $('.js-login'),
    $name = $('.js-name'),
    username = null;

socket
    .on('join', function (user) {
        printStatus(user);
        console.log(user)
    })
    .on('receiveMsg', function (opt) {
        printMsg(opt.user, opt.msg);
    })

function printStatus(user) {
    $('<li>').append('<strong>' + user + '</strong>' + ' зашел на огонек').addClass('bg-info').appendTo($messages);
}

function printMsg(user, msg) {
    $('<li>').append('<strong>' + user + ' написал:</strong> ' + msg).addClass('bg-success').appendTo($messages);
}

$login.submit(function (ev) {
    ev.preventDefault();
    username = $name.val();
    socket.emit('join', username);
    $(this).hide();
    $msgForm.fadeIn(400);
    $messages.fadeIn(400);
});

$msgForm.submit(function (ev) {
    ev.preventDefault();
    socket.emit('sendMsg', {
        user: username,
        msg: $msgInput.val()
    });
    $msgInput.val('');
});

