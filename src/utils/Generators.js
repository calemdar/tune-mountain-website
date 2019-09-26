// tools for generating stuff

const Generators = {};

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
Generators.randomString = (length) => {

	let text = "";
	const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (let index = 0; index < length; index++) {

			text += possible.charAt(Math.floor(Math.random() * possible.length));

	}

	return text;

};

module.exports = Generators;
