const dotenv = require('dotenv').config()

if (dotenv.error) {
    console.log(dotenv);
  }
else { console.log("works"); }

const config = {
    awsKey: process.env.AWS_ACCESS_KEY_ID,
    awsPass: process.env.AWS_SECRET_ACCESS_KEY
}

module.exports = config;