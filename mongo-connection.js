const mongoose 	= require('mongoose')

function connect(){

	//starting connection
	mongoose.connect('mongodb://localhost/revchallenge', { useNewUrlParser: true });
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function() {
	  console.log('connected to local db!')
	});
}

module.exports = {
	connect
}