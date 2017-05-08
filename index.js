#!/usr/bin/env node

const http = require('http');
const https = require('https');
const proxy = require('http-proxy').createProxyServer({});
const servers = [];
const ports = [];

function startAll() {
  for(let i = 0; i < servers.length; i++) {
    servers[i].listen(ports[i]);
  }
}

function add(port, mapping, certKey) {
  var reverse = (req, res) => {
    // todo: may consider improve this one, to cover sub-url as well e.g. v1/api/
    let host = req.headers.host.split(':')[0];
    let route = req.url.split('?')[0];
    route = route.endsWith('/') ? route.substr(0, route.length - 1) : route;
    let mapFrom = host + route;
    if(mapping[mapFrom]) {
      console.log("resolving:", mapFrom);
      proxy.web(req, res, { target: mapping[mapFrom] });
    }
    else {
      console.warn("cannot find rule in the mapping:", host);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end("Unmapped url");
    }
  };

  ports.push(port);
  if(certKey) {
    servers.push(https.createServer(certKey, reverse));
  }
  else {
    servers.push(http.createServer(reverse));
  }
}

module.exports = {
  startAll,
  add
}
