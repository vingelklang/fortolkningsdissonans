const http = require('http')
const maxApi = require('max-api');

const options = {
  hostname: '192.168.0.190',
  port: 3000,
  path: '/api/test-data',
  method: 'GET',
  json:true
}

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

maxApi.addHandler('request', (res) => {
  //console.log(`statusCode: ${res.statusCode}`)
  getData(options);
  //var jsonObject = JSON.parse(res);
  console.log("Request!");
})
