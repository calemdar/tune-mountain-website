const {Router} = require("express");
const querystring = require("querystring");
const request = require("request");
const config = require("../../config");
const {randomString} = require("../utils/Generators");
const logger = require("../utils/Logger")();

const router = Router();
const stateKey = "spotify_auth_state";

// if react is is proxying to node server, use this, otherwise comment it out
const DEBUG = "https://tune-mountain.com"; // "http://localhost:3000";

/**
 * Spotify Login handling.
 * Redirects to spotify account service.
 */
router.get("/login", (req, res) => {

	const state = randomString(16);
	res.cookie(stateKey, state);

	// your application requests authorization
	const scope = "user-read-private user-read-email streaming user-modify-playback-state";

	const queryObject = {
		"response_type": "code",
		"client_id": config.spotify.clientID,
		"scope": scope,
		"redirect_uri": config.spotify.redirectURI,
		"state": state
	};

	// redirects
	res.redirect(`https://accounts.spotify.com/authorize?${querystring.stringify(queryObject)}`);

	logger.log([
		"Login redirect clicked. Query object is: ",
		queryObject
	]);

});

/**
 * Redirect from initial login.
 * Receives data and fetches tokens.
 */
router.get("/callback", (req, res) => {

	console.log("callback endpoint reached");

	/*
	 * your application requests refresh and access tokens after checking
	 * the state parameter
	 */

	const code = req.query.code || null;
	const state = req.query.state || null;
	const storedState = req.cookies
		? req.cookies[stateKey]
		: null;

	if (state === null || state !== storedState) {

		res.redirect(`/#${
			querystring.stringify({
				"error": "state_mismatch"
			})}`);

		logger.log({
            "error:": "State mismatch!",
            "state": state
		});

	} else {

		res.clearCookie(stateKey);

		const authOptions = {
			"url": "https://accounts.spotify.com/api/token",
			"form": {
				"code": code,
				"redirect_uri": config.spotify.redirectURI,
				"grant_type": "authorization_code"
			},
			"headers": {
				"Authorization": `Basic ${Buffer.from(`${config.spotify.clientID}:${config.spotify.clientSecret}`).toString("base64")}`
			},
			"json": true
		};

		console.log(authOptions);

		// request tokens
		request.post(authOptions, (error, response, body) => {
			if (!error && response.statusCode === 200) {

				const accessToken = body.access_token,
					refreshToken = body.refresh_token;

				logger.log({accessToken,
refreshToken});

				const queryParameters = querystring.stringify({
					"accessToken": accessToken,
					"refreshToken": refreshToken
				});

				// we can also pass the token to the browser to make requests from there
				res.redirect(`${DEBUG || ""}/?${queryParameters}`);

			} else {
 res.redirect(`${DEBUG || ""}/?${querystring.stringify({"error": "invalid_token"})}`);
}

		});
	}
});

/**
 * Refreshes Spotify token.
 */
router.get("/refresh-token/:refresh_token", (req, res) => {

	// requesting access token from refresh token
	const refreshToken = req.params.refresh_token;
	const authOptions = {
		"url": "https://accounts.spotify.com/api/token",
		"headers": {"Authorization": `Basic ${Buffer.from(`${config.spotify.clientID}:${config.spotify.clientSecret}`).toString("base64")}`},
		"form": {
			"grant_type": "refresh_token",
			"refresh_token": refreshToken
		},
		"json": true
	};

	request.post(authOptions, (error, response, body) => {
		if (!error && response.statusCode === 200) {

			const accessToken = body.access_token;
			res.json({
				"accessToken": accessToken
			});

		}
	});
});

/**
 * Fetches user information and passes it as a
 * JSON object to client.
 */
router.get("/user-information/:accessToken", (req, res) => {

	const options = {
		"url": "https://api.spotify.com/v1/me",
		"headers": {"Authorization": `Bearer ${req.params.accessToken}`},
		"json": true
	};

	// use the access token to access the Spotify Web API
	request.get(options, (error, response, body) => {

		res.json(body);

	});

});

/**
 * Clears response cookie.
 */
router.post("/clear-cookie", (req, res) => {

	res.clearCookie(stateKey);

	res.json({
		"response": "Cookie cleared."
	})

});

module.exports = router;
