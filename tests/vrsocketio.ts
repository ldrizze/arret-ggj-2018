let socketa = require('socket.io-client')('ws://arretggj2018.herokuapp.com');
setTimeout(function(){console.log('sending...');socketa.emit('action', {'action': 'makematch', 'type' : 'vr'})}, 500)
socketa.on('action', data => {
	console.log(data)
})