
/*
    To make a request to server install request and crypto
    Following are npm commands to install above modules
    npm install request
    npm install crypto-js
*/

const request = require('request');
const crypto = require('crypto-js');

var host = "https://apiv1.decoin.io/";
var path ="Order/create-order";
var url = host+path;
var key = "12345";
var secret = "12345";                           // api secret will be used to create signature HmacSHA256
var method = "POST";                            // method type
var signature = null;
var time = new Date().getTime();                // current time in milliseconds
var exp_time = new Date().getTime() + 50000;    // add expiration time of signature in milliseconds

// parameters required to request, in LimitOrder rate is mendatory
var params = {"OrderType":"Buy","PairName":"BTC-USDT","Quantity":"10","Rate":"1","Type":"LimitOrder"};

// create string by concating all the required values in gives sequence
var signatureString = key+url+method+JSON.stringify(params)+time.toString()+exp_time.toString();
// Remember: signature should be in HmacSHA256
signature =  crypto.HmacSHA256(signatureString, secret).toString();

// Making request
// Below headers must be passed to fullfill the request
var headers = 
	{
		'KEY-X': key,
		'SIG-X': signature,
		'TIME-X':time.toString(),
        'EXP-X':exp_time.toString(),
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': '*/*'    
	};

const options = {
  url: url,
  headers: headers,
  method: method,
  form: params
};

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    const info = JSON.parse(body);
    console.log(info);
  }
}
request(options, callback);