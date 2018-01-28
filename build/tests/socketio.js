var socket = require('socket.io-client')('http://localhost:8000');
setTimeout(function () { console.log('sending...'); socket.emit('action', { 'action': 'route' }); }, 1000);
socket.on('action', function (data) {
    console.log(data);
});
//# sourceMappingURL=socketio.js.map