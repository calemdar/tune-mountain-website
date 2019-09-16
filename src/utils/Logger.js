/**
 * Module for standardized logging.
 *
 * @constructor
 */
function Logger (appName = "Tune Mountain") {

	const MODULE = {};

	// console logs with app name
	MODULE.log = (arg) => {

		const timestamp = new Date();
		console.log(`[ ${appName} @ ${timestamp.getHours()}:${timestamp.getMinutes()}:${timestamp.getSeconds()} ] =>`, arg);

	};

	// console error's with app name
	MODULE.err = (arg) => {

		const timestamp = new Date();
		console.error(`[ ${appName} @ ${timestamp.getHours()}:${timestamp.getMinutes()}:${timestamp.getSeconds()} ] =>`, arg);

	};

	// return the logger
	return MODULE;

}

module.exports = Logger;
