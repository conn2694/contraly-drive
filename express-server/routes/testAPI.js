var express = require("express");
var router = express.Router();

const users = require("../resources/dummyData.json")

router.get("/", function(req, res, next) {
    res.send(users);
});

module.exports = router;