var express = require('express');
var router = express.Router();
var sql = require("../../src/modules/sqlModule");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();



/* GET users listing. */
router.get('/', function(req, res, next) {

  res.send(sql.getAllUsers());
});
/* POST new user */
router.post('/', async function(req, res, next) {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    req.body.password = hashedPassword;
    sql.insertUser(req.body);
    res.sendStatus(200);
  }
  catch { res.sendStatus(500); }
  res.end();

});

// POST since we are creating the JWT
router.post('/login', async function(req, res, next) {
  try{
    const user = sql.getUserByUsername(req.body.username);
    // password matches hash
    if (await bcrypt.compare(req.body.password, user.password)) {
      const accessToken = jwt.sign(user, process.env.ACCESS_SECRET_KEY);
      res.send(accessToken);
    }

  }
  catch {
    res.statusCode(404).send();
  }
});

module.exports = router;
