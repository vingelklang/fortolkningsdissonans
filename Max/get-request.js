const http = require('http')
const url = require('url');
const maxApi = require('max-api');
const SocksProxyAgent = require('socks-proxy-agent');

// SOCKS proxy to connect to
var proxy = process.env.socks_proxy || 'socks://127.0.0.1:9150';
console.log('using proxy server %j', proxy);

// HTTP endpoint for the proxy to connect to
var endpoint = process.argv[2] || 'http://x2dvt6rxtpedsuvqb6rr34ysb6bmhwa67pwq3bp6aswpphlb2sk4gryd.onion/api/get-today';
console.log('attempting to GET %j', endpoint);
var opts = url.parse(endpoint);

// create an instance of the `SocksProxyAgent` class with the proxy server information
var agent = new SocksProxyAgent(proxy);
opts.agent = agent;

function getData() {
	http.get(opts, function (res) {
    //console.log('"response" event!', res.headers);
    res.on("data", data => {
      const d = JSON.parse(data);
      //console.log(d);
      maxApi.outlet(d);
	  maxApi.outletBang();
    });
});
}


maxApi.addHandler('request', (res) => {
  getData();
})
