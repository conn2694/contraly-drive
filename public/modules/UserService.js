import express from 'express';
import { createPoolCluster } from 'mysql';
 
const app = express();
const repo = require('./sqlModule')

function createUser(req) {
  repo.insertUser()
}

app.post('/user', (req, res) => {
  return res.send('Received a POST HTTP method');
});