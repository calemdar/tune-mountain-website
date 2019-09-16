const {Router} = require('express');
const querystring = require('querystring');
const request = require('request');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const config = require('../../config');
const randomString = require('../utils/Generators').randomString;
const logger = require('../utils/Logger')();

const router = Router();

const stateKey = "spotify_auth_state";

/**
 * Spotify Login handling.
 * Redirects to spotify account service.
 */
router.get('/login', cors(), (req, res) => {

	const state = randomString(16);
	res.cookie(stateKey, state);

	// your application requests authorization
	const scope = "user-read-private user-read-email";

	const queryObject = {
		response_type: 'code',
		client_id: config.spotify.clientID,
		scope: scope,
		redirect_uri: config.spotify.redirectURI,
		state: state
	};

	// redirects
	res.redirect(`https://accounts.spotify.com/authorize?${querystring.stringify(queryObject)}`);

	logger.log(["Login redirect clicked. Query object is: ", queryObject]);

});

/**
 * Redirect from initial login.
 * Receives data and fetches tokens.
 */
router.get('/callback', cors(), function(req, res) {

	console.log('callback endpoint reached');

	// your application requests refresh and access tokens
	// after checking the state parameter

	const code = req.query.code || null;
	const state = req.query.state || null;
	const storedState = req.cookies ? req.cookies[stateKey] : null;

	if (state === null || state !== storedState) {

		res.redirect('/#' +
			querystring.stringify({
				error: 'state_mismatch'
			}));

		logger.log('State mismatch!');

	} else {

		res.clearCookie(stateKey);
		const authOptions = {
			url: "https://accounts.spotify.com/api/token",
			form: {
				code: code,
				redirect_uri: config.spotify.redirectURI,
				grant_type: "authorization_code"
			},
			headers: {
				"Authorization": "Basic " + (Buffer.from(config.spotify.clientID + ":" + config.spotify.clientSecret).toString("base64"))
			},
			json: true
		};

		console.log(authOptions);

		// request tokens
		request.post(authOptions, function(error, response, body) {
			if (!error && response.statusCode === 200) {

				const accessToken  = body.access_token,
					  refreshToken = body.refresh_token;

				const options = {
					url: "https://api.spotify.com/v1/me",
					headers: { "Authorization": "Bearer " + accessToken },
					json: true
				};

				// use the access token to access the Spotify Web API
				request.get(options, function(error, response, body) {

					console.log(body);

				});

				logger.log({accessToken, refreshToken});

				const queryParameters = querystring.stringify({
					accessToken: accessToken,
					refreshToken: refreshToken
				});

				// we can also pass the token to the browser to make requests from there
				res.redirect(`/#${queryParameters}`);

			} else res.redirect(`/#${ querystring.stringify({ error: 'invalid_token' }) }`);

		});
	}
});

module.exports = router;
