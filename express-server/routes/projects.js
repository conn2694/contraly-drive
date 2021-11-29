var express = require("express");
var router = express.Router();
var sql = require("../../src/modules/sqlModule")

router.get("/", function (req, res, next) {
    sql.getProjectsPromise
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
});

router.get("/:projectId", function (req, res, next) {
    sql.getFoldersFromProject(req.params.projectId)
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        })
})

module.exports = router;