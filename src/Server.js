#!/usr/bin/env node

//     *** Node Application ***     //
// serves static files and proxies  //
// requests to the Spotify services //

/* eslint node/shebang:0*/
const express = require("express"),
	path = require("path"),
	cors = require("cors"),
	bodyParser = require("body-parser"),
	logger = require("./utils/Logger")(),
	spotifyService = require("./routes/SpotifyServiceBackend"),
	proxyRouter = require("./routes/ProxyRouter"),
	port = (process.env.PORT || 8080);

const app = express();

// utilize static react files
app.use(express.static(path.join(__dirname, "../static")));
app.use(bodyParser.json());
app.use(cors());

app.use("/api", proxyRouter);
app.use("/spotify-service", spotifyService);

// return react index file
app.get("/", (req, res) => {

	// status ok
	res.status(200).
		sendFile(path.join(__dirname + "/index.html"));

});

/**
 * Start server
 */
app.listen(port, () => {

	logger.log(`Running on port ${port}`)

});