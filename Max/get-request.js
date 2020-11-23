const http = require('http')
const maxApi = require('max-api');
const shttp = require('socks5-http-client');

const options = {
  hostname: 'http://x2dvt6rxtpedsuvqb6rr34ysb6bmhwa67pwq3bp6aswpphlb2sk4gryd.onion/',
  port: 80,
  path: '/api/',
  method: 'GET',
  json:true
}

function getData(options) {
shttp.get({socksPort: 9050, socksHost: "localhost", url: 'http://x2dvt6rxtpedsuvqb6rr34ysb6bmhwa67pwq3bp6aswpphlb2sk4gryd.onion/api/get-today'}, function(res) {
    res.setEncoding('utf8');
	res.on("data", data => {
      d = JSON.parse(data);
      console.log(d);
      maxApi.outlet(d);
    });
});
}

/*
function getData(options) {
  const readRequest = http.request(options, res => {
    res.on("data", data => {
      d = JSON.parse(data);
      console.log(d);
      maxApi.outlet(d);
    });
  });
  readRequest.end();
}
*/

maxApi.addHandler('request', (res) => {
  //console.log(`statusCode: ${res.statusCode}`)
  getData(options);
  //var jsonObject = JSON.parse(res);
  console.log("Request!");
})
