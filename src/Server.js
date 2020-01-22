#!/usr/bin/env node

//     *** Node Application ***     //
// serves static files and proxies  //
// requests to the Spotify services //

/* eslint node/shebang:0*/
const express = require("express"),
	path = require("path"),
	cors = require("cors"),
	cookieParser = require("cookie-parser"),
	logger = require("./utils/Logger")(),
	spotifyService = require("./routes/SpotifyServiceBackend"),
	port = (process.env.PORT || 8080);

// todo: separate requests into their own routes

const app = express();

// utilize static react files
app.use(express.static(path.join(__dirname, "../static")));
app.use(cookieParser());
app.use(cors());
app.use("/spotify-service", spotifyService);

// return react index file
app.get("/", (req, res) => {

	// status ok
	res.status(200);
	res.sendFile(path.join(__dirname + "/index.html"));

});

app.get("/test", (req, res) => {

	console.log("this works!");
	res.json({"response": "hello!"});

});

/**
 * Start server
 */
app.listen(port, () => {

	logger.log(`Running on port ${port}`)

});