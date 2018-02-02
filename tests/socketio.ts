let socket = require('socket.io-client')('ws://arretggj2018.herokuapp.com');
setTimeout(function(){console.log('sending...');socket.emit('action', {'action': 'makematch', 'type' : 'mobile'})}, 500)
socket.on('action', data => {
	console.log(data)
})