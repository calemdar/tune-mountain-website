const {Router} = require("express");
const request = require("request");

const router = Router();
const baseUrl = "https://api.leogons.com/tm";
const devUrl = "http://localhost:9595/tm";

// proxies all requests to API server
router.all("/*", (req, res) => {

    const options = {
        "url": baseUrl + req.path,
        "json": true,
        "body": req.body
    };

    // pass on game version header if present
    const gameVersion = req.header("x-game-version");
    if (gameVersion) {
        options.headers = {
            "X-Game-Version": gameVersion
        };
    }

    console.log("Proxying request to", options.url);
    console.log(options);

    if (req.method === "GET") {
        request.get(options, (error, response, body) => {
            console.log("Response received.", body, error);
            if (!error) res.status(response ? response.statusCode : 200).send(body);
            else res.status(400).send(error);
        });
    } else if (req.method === "POST") {
        request.post(options, (error, response, body) => {
            console.log("Response received.", body, error);
            if (!error) res.status(response ? response.statusCode : 200).send(body);
            else res.status(400).send(error);
        });
    } else {
        res.status(404).send({
           "status": "failure",
           "description": "Invalid HTTP operation."
        });
    }

});

module.exports = router;
