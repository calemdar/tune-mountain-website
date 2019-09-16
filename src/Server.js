//     *** Node Application ***     //
// serves static files and proxies  //
// requests to the Spotify services //

const express = require('express'),
	path = require('path'),
	cors = require('cors'),
	cookieParser = require('cookie-parser'),
	logger = require('./utils/Logger')(),
	spotifyService = require('./routes/SpotifyServiceBackend'),
	port = (process.env.PORT || 8080);

// todo: separate requests into their own routes

const app = express();

// utilize static react files
app.use(express.static(path.join(__dirname, '../tune-mountain-client/build')));
app.use('/spotify-service', spotifyService);
app.use(cookieParser());

// return react index file
app.get('/', function(req, res) {

	// status ok
	res.status(200);
	res.sendFile(path.join(__dirname + '/index.html'));

});

app.get('/test', function (req, res) {

	console.log('this works!');
	res.json({'response': 'hello!'});

});

/**
 * Start server
 */
app.listen(port, function () {

	const timestamp = new Date();
	logger.log(`Running on port ${port}`)

});