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
    let host = req.headers.host.split(':')[0];
    if(mapping[host]) {
      console.log("resolving:", host);
      proxy.web(req, res, { target: mapping[host] });
    }
    else {
      console.warn("cannot find rule in the mapping:", host);
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
