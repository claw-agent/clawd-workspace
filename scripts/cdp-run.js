const WebSocket = require('ws');
const fs = require('fs');
const ws = new WebSocket('ws://localhost:9222/devtools/page/381F3440806D2C6DBB7CBA10555C27F0');
let id = 1;

function send(method, params) {
  return new Promise((resolve) => {
    const mid = id++;
    ws.send(JSON.stringify({id: mid, method, params: params || {}}));
    const handler = (data) => {
      const msg = JSON.parse(data.toString());
      if (msg.id === mid) { ws.off('message', handler); resolve(msg); }
    };
    ws.on('message', handler);
  });
}

async function run() {
  const jsCode = process.argv[2];
  const r = await send('Runtime.evaluate', {expression: jsCode});
  console.log(JSON.stringify(r.result, null, 2));
  ws.close();
}

ws.on('open', run);
ws.on('error', (e) => { console.error(e.message); process.exit(1); });
