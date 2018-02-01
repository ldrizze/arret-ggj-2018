let socket = require('socket.io-client')('ws://localhost:8000');
setTimeout(function(){console.log('sending...');socket.emit('action', {'action': 'makematch', 'type' : 'vr'})}, 500)
socket.on('action', data => {
	console.log(data)
})