const WebSocket = require('ws');
const fs = require('fs');
const wsUrl = 'ws://localhost:9222/devtools/page/381F3440806D2C6DBB7CBA10555C27F0';
const ws = new WebSocket(wsUrl);
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
  // Focus the textarea
  await send('Runtime.evaluate', {expression: 'document.querySelector("textarea").focus()'});
  
  // Select all existing text first
  await send('Input.dispatchKeyEvent', {type: 'keyDown', key: 'a', code: 'KeyA', modifiers: 2}); // Cmd+A
  await send('Input.dispatchKeyEvent', {type: 'keyUp', key: 'a', code: 'KeyA', modifiers: 2});
  
  // Delete it
  await send('Input.dispatchKeyEvent', {type: 'keyDown', key: 'Backspace', code: 'Backspace'});
  await send('Input.dispatchKeyEvent', {type: 'keyUp', key: 'Backspace', code: 'Backspace'});
  
  await new Promise(r => setTimeout(r, 500));
  
  // Type the prompt using insertText
  const prompt = "A young man with red-gold hair and golden eyes stands at the edge of a vast underground cavern, looking up at an artificial sky dome filled with fake stars. Cinematic, moody lighting, shot on 35mm film, shallow depth of field.";
  await send('Input.insertText', {text: prompt});
  
  await new Promise(r => setTimeout(r, 1000));
  
  // Screenshot
  const r = await send('Page.captureScreenshot', {format: 'png'});
  fs.writeFileSync('/tmp/chatcut-typed2.png', Buffer.from(r.result.data, 'base64'));
  
  console.log('done');
  ws.close();
});
