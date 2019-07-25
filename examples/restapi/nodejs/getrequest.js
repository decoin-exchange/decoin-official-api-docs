/*
    To make a request to server install request and crypto
    Following are npm commands to install above modules
    npm install request  
*/

const request = require('request');

var host = "https://apiv1.decoin.io/";
var path ="market/get-currencies";
var url = host+path;

request(url, { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  console.log(res.body);
});