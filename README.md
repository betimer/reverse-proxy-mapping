# reverse-proxy-mapping
[![npm version](https://img.shields.io/npm/v/reverse-proxy-mapping.svg)](https://www.npmjs.com/package/reverse-proxy-mapping)

This package is mainly created for single server hosting for multiple websites.

You may have multiple domains/subdomains, and you want all host them in the same server with http port 80, or https port 443.

This package helps you easily to achieve that.

Your main work is to config it.

```javascript
const servers = require('reverse-proxy-mapping');

// domains
servers.add(3004, {
  'host1.domain1.com': 'http://localhost:3001',
  'host2.domain1.com': 'http://localhost:3002',
  'domain2.com': 'http://localhost:3003',
  'local.betimer.com': 'http://localhost:8001'
});

// routes
servers.add(3005, {
  'local.betimer.com/api/v1': 'http://localhost:8002',
  'local.betimer.com/api/v2': 'http://localhost:8003'
});

// https example
servers.add(3006, {
  'host1.domain1.com': 'http://localhost:3001',
  'host2.domain1.com': 'http://localhost:3002',
  'domain2.com': 'http://localhost:3002',
  'local.betimer.com': 'http://localhost:8001'
},{
  cert: cert,
  key: key
});

servers.startAll();

```