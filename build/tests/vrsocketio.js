var socketa = require('socket.io-client')('ws://localhost:8000');
setTimeout(function () { console.log('sending...'); socketa.emit('action', { 'action': 'makematch', 'type': 'vr' }); }, 500);
socketa.on('action', function (data) {
    console.log(data);
});
//# sourceMappingURL=vrsocketio.js.map