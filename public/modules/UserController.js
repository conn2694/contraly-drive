import express from 'express';
 
const userService = require('./UserService')
const app = express();
const port = 8080
 
 
app.post('/user', (req, res) => {

    // TODO: Map the request onto the model and then run it through the createUser function
    userService.createUser(req);
    return res.send('Received a POST HTTP method');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })