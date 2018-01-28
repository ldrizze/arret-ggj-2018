var socket = require('socket.io-client')('https://arretggj2018.herokuapp.com');
setTimeout(function () { console.log('sending...'); socket.emit('action', { 'action': 'route' }); }, 5000);
socket.on('action', function (data) {
    console.log(data);
});
//# sourceMappingURL=socketio.js.map