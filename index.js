#!/usr/bin/env node

const http = require('http');
const https = require('https');
const proxy = require('http-proxy').createProxyServer({});
const servers = [];
const ports = [];

function startAll() {
  for (let i = 0; i < servers.length; i++) {
    servers[i].listen(ports[i]);
    console.log("Started server on port:", ports[i]);
  }
}

function add(port, mapping, certKey) {
  var reverse = (req, res) => {
    // take out the port
    let host = req.headers.host.split(':')[0];
    // take out the query strings
    let route = req.url.split('?')[0];
    route = route.endsWith('/') ? route.substr(0, route.length - 1) : route;
    // construct url
    let mapFrom = host + route;

    // checking mapping
    for (const from in mapping) {
      if (mapFrom.startsWith(from)) {
        console.log("resolving:", mapFrom);
        proxy.web(req, res, { target: mapping[from] });
        return;
      }
    }

    // cannot find route mapping rule
    console.warn("cannot find rule in the mapping:", mapFrom);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end("Unmapped url: " + mapFrom);
  };

  // add node server into the server list
  ports.push(port);
  if (certKey) {
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
