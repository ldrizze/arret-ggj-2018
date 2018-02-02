var socket = require('socket.io-client')('ws://arretggj2018.herokuapp.com');
setTimeout(function () { console.log('sending...'); socket.emit('action', { 'action': 'makematch', 'type': 'mobile' }); }, 500);
socket.on('action', function (data) {
    console.log(data);
});
//# sourceMappingURL=socketio.js.map