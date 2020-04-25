const {Router} = require("express");
const request = require("request");

const router = Router();
const temp = "https://api.leogons.com/tm";
const baseUrl = "http://localhost:9595/tm";

// proxies all requests to API server
router.all("/*", (req, res) => {

    const options = {
        "url": baseUrl + req.path,
        "json": true,
        "body": req.body
    };

    if (req.method === "GET") {
        request.get(options, (error, response, body) => res.status(response.statusCode).send(body));
    } else if (req.method === "POST") {
        request.post(options, (error, response, body) => res.status(response.statusCode).send(body));
    } else {
        res.status(404).send({
           "status": "failure",
           "description": "Invalid HTTP operation."
        });
    }

});

module.exports = router;
