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
  // Focus textarea
  await send('Runtime.evaluate', {expression: 'document.querySelector("textarea").focus()'});
  await new Promise(r => setTimeout(r, 300));
  
  // Type prompt
  const prompt = "A young man with red-gold hair and golden eyes stands at the edge of a vast underground cavern, looking up at an artificial sky dome filled with fake stars. Cinematic, moody lighting, shot on 35mm film, shallow depth of field.";
  await send('Input.insertText', {text: prompt});
  await new Promise(r => setTimeout(r, 1000));
  
  // Screenshot before submit
  var r = await send('Page.captureScreenshot', {format: 'png'});
  fs.writeFileSync('/tmp/chatcut-before-submit.png', Buffer.from(r.result.data, 'base64'));
  
  // Press Enter to submit
  await send('Input.dispatchKeyEvent', {type: 'keyDown', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13, nativeVirtualKeyCode: 13});
  await send('Input.dispatchKeyEvent', {type: 'keyUp', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13, nativeVirtualKeyCode: 13});
  
  await new Promise(r => setTimeout(r, 5000));
  
  // Screenshot after submit
  r = await send('Page.captureScreenshot', {format: 'png'});
  fs.writeFileSync('/tmp/chatcut-after-submit.png', Buffer.from(r.result.data, 'base64'));
  
  // Get page text
  const text = await send('Runtime.evaluate', {expression: 'document.body.innerText.substring(0,2000)'});
  console.log(text.result.value);
  
  ws.close();
});
