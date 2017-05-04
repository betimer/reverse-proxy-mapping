console.log("start testing");

const servers = require('./index');

servers.add(4004, {
  'host1.domain1.com': 'http://localhost:3001',
  'host2.domain1.com': 'http://localhost:3002',
  'domain2.com': 'http://localhost:3002',
  'local.betimer.com': 'http://localhost:8001'
});

servers.add(4005, {
  'host1.domain1.com': 'http://localhost:3001',
  'host2.domain1.com': 'http://localhost:3002',
  'domain2.com': 'http://localhost:3002',
  'local.betimer.com': 'http://localhost:8001'
});

servers.startAll();
console.log("touched end test.js")
