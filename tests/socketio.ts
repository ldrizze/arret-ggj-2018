let socket = require('socket.io-client')('https://arretggj2018.herokuapp.com');
setTimeout(function(){console.log('sending...');socket.emit('action', {'action': 'route'})}, 5000)
socket.on('action', data => {
	console.log(data)
})