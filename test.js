console.log("start testing");
const servers = require('./index');

servers.add(3004, {
  'host1.domain1.com': 'http://localhost:3001',
  'host2.domain1.com': 'http://localhost:3002',
  'domain2.com': 'http://localhost:3002',
  'local.betimer.com': 'http://localhost:8001'
});

servers.add(3005, {
  'host1.domain1.com': 'http://localhost:3001',
  'host2.domain1.com': 'http://localhost:3002',
  'domain2.com': 'http://localhost:3002',
  'local.betimer.com/api/v1': 'http://localhost:8002',
  'local.betimer.com/api/v2': 'http://localhost:8003'
});

servers.startAll();
console.log("touched end test.js");
