var socket = require('socket.io-client')('ws://localhost:8000');
setTimeout(function () { console.log('sending...'); socket.emit('action', { 'action': 'makematch', 'type': 'vr' }); }, 500);
socket.on('action', function (data) {
    console.log(data);
});
//# sourceMappingURL=socketio.js.map