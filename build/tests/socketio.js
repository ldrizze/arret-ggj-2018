var socket = require('socket.io-client')('https://arretggj2018.herokuapp.com/:56299');
setTimeout(function () { console.log('sending...'); socket.emit('action', { 'action': 'route' }); }, 5000);
socket.on('action', function (data) {
    console.log(data);
});
//# sourceMappingURL=socketio.js.map