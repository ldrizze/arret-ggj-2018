// let socket = require('socket.io-client')('ws://arretggj2018.herokuapp.com');
let socket = require('socket.io-client')('ws://localhost:8000');
setTimeout(function(){
	console.log('sending...');
	socket.emit('action', {'action': 'makematch', 'type' : 'mobile'})

	setTimeout(function(){
		console.log("ready")
		socket.emit('action', {'action' : 'gameplayLoaded'});

		setTimeout(function(){
			console.log("place drone")
			socket.emit('action', {'action' : 'placeDrone', 'x' : 5.0, 'y' : 2.0, 'z' : 15.3})

			setTimeout(function(){
				console.log("walk like alien 8)")
				socket.emit('action', {'action' : 'moveAlien', 'x' : 5.0, 'y' : 2.0, 'z' : 15.3 })

				setInterval(function(){
					console.log("get the tick")
					socket.emit('action', {'action':'tick'})
				}, 1000);
			}, 1000)
		}, 3000)
	}, 5000);
}, 500)


socket.on('action', data => {
	console.log(data)
})