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
ws.on('open', async () => {
  const r = await send('Page.captureScreenshot', {format: 'png'});
  fs.writeFileSync(process.argv[2] || '/tmp/cdp-ss.png', Buffer.from(r.result.data, 'base64'));
  console.log('done');
  ws.close();
});
