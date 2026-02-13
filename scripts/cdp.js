#!/usr/bin/env node
// CDP (Chrome DevTools Protocol) helper for browser automation
// Usage: node cdp.js <command> [args...]
// Commands: tabs, navigate <url>, screenshot <file>, click <selector>, type <selector> <text>, text, eval <js>

const WebSocket = require('ws');
const fs = require('fs');
const http = require('http');

const CDP_URL = 'http://127.0.0.1:9222';
const [,, command, ...args] = process.argv;

async function getTargets() {
  return new Promise((resolve, reject) => {
    http.get(`${CDP_URL}/json`, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

async function cdp(wsUrl, method, params = {}) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(wsUrl);
    const id = Date.now();
    ws.on('open', () => ws.send(JSON.stringify({ id, method, params })));
    ws.on('message', data => {
      const msg = JSON.parse(data.toString());
      if (msg.id === id) { ws.close(); resolve(msg); }
    });
    ws.on('error', reject);
    setTimeout(() => { ws.close(); reject(new Error('timeout')); }, 15000);
  });
}

async function cdpMulti(wsUrl, commands) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(wsUrl);
    const results = [];
    let idx = 0;
    ws.on('open', () => {
      const send = () => {
        if (idx >= commands.length) return;
        const [method, params, delay] = commands[idx];
        setTimeout(() => {
          ws.send(JSON.stringify({ id: idx + 1, method, params: params || {} }));
        }, delay || 0);
      };
      send();
    });
    ws.on('message', data => {
      const msg = JSON.parse(data.toString());
      if (msg.id === idx + 1) {
        results.push(msg);
        idx++;
        if (idx >= commands.length) { ws.close(); resolve(results); }
        else {
          const [method, params, delay] = commands[idx];
          setTimeout(() => {
            ws.send(JSON.stringify({ id: idx + 1, method, params: params || {} }));
          }, delay || 0);
        }
      }
    });
    ws.on('error', reject);
    setTimeout(() => { ws.close(); resolve(results); }, 30000);
  });
}

async function getFirstPage() {
  const targets = await getTargets();
  const page = targets.find(t => t.type === 'page');
  if (!page) throw new Error('No page targets found');
  return page;
}

async function main() {
  try {
    switch (command) {
      case 'tabs': {
        const targets = await getTargets();
        targets.filter(t => t.type === 'page').forEach(t => {
          console.log(`${t.id}: ${t.title} — ${t.url}`);
        });
        break;
      }
      case 'navigate': {
        const page = await getFirstPage();
        const r = await cdp(page.webSocketDebuggerUrl, 'Page.navigate', { url: args[0] });
        console.log('Navigated:', args[0]);
        break;
      }
      case 'screenshot': {
        const page = await getFirstPage();
        const r = await cdp(page.webSocketDebuggerUrl, 'Page.captureScreenshot', { format: 'png' });
        const file = args[0] || '/tmp/cdp-screenshot.png';
        fs.writeFileSync(file, Buffer.from(r.result.data, 'base64'));
        console.log('Screenshot:', file);
        break;
      }
      case 'text': {
        const page = await getFirstPage();
        const r = await cdp(page.webSocketDebuggerUrl, 'Runtime.evaluate', {
          expression: 'document.body.innerText.slice(0, 2000)'
        });
        console.log(r.result?.result?.value);
        break;
      }
      case 'eval': {
        const page = await getFirstPage();
        const r = await cdp(page.webSocketDebuggerUrl, 'Runtime.evaluate', {
          expression: args.join(' '),
          awaitPromise: true
        });
        console.log(JSON.stringify(r.result?.result, null, 2));
        break;
      }
      case 'click': {
        const page = await getFirstPage();
        // Find element and click it
        const r = await cdp(page.webSocketDebuggerUrl, 'Runtime.evaluate', {
          expression: `(() => {
            const el = document.querySelector('${args[0]}');
            if (!el) return 'Element not found: ${args[0]}';
            el.click();
            return 'Clicked: ' + el.textContent.trim().slice(0, 50);
          })()`
        });
        console.log(r.result?.result?.value);
        break;
      }
      case 'clicktext': {
        const page = await getFirstPage();
        const text = args.join(' ');
        const r = await cdp(page.webSocketDebuggerUrl, 'Runtime.evaluate', {
          expression: `(() => {
            for (const el of document.querySelectorAll('button, a, [role=button], input[type=submit]')) {
              if (el.textContent.includes('${text}')) { el.click(); return 'Clicked: ' + el.textContent.trim().slice(0, 50); }
            }
            return 'Not found: ${text}';
          })()`
        });
        console.log(r.result?.result?.value);
        break;
      }
      case 'type': {
        const page = await getFirstPage();
        const selector = args[0];
        const text = args.slice(1).join(' ');
        const r = await cdp(page.webSocketDebuggerUrl, 'Runtime.evaluate', {
          expression: `(() => {
            const el = document.querySelector('${selector}');
            if (!el) return 'Element not found';
            el.focus();
            el.value = '${text}';
            el.dispatchEvent(new Event('input', {bubbles: true}));
            el.dispatchEvent(new Event('change', {bubbles: true}));
            return 'Typed into: ' + el.tagName;
          })()`
        });
        console.log(r.result?.result?.value);
        break;
      }
      case 'newtab': {
        const page = await getFirstPage();
        const r = await cdp(page.webSocketDebuggerUrl, 'Target.createTarget', { url: args[0] || 'about:blank' });
        console.log('New tab:', r.result?.targetId);
        break;
      }
      case 'login-chatcut': {
        // Full login flow for chatcut.io
        const page = await getFirstPage();
        const ws = page.webSocketDebuggerUrl;
        
        // Step 1: Navigate to login
        await cdp(ws, 'Page.navigate', { url: 'https://chatcut.io/login' });
        await new Promise(r => setTimeout(r, 3000));
        
        // Step 2: Click "Continue with email"
        let r = await cdp(ws, 'Runtime.evaluate', {
          expression: `(() => {
            for (const el of document.querySelectorAll('button')) {
              if (el.textContent.includes('Continue with email')) { el.click(); return 'clicked email button'; }
            }
            return 'button not found';
          })()`
        });
        console.log('Step 1:', r.result?.result?.value);
        await new Promise(r => setTimeout(r, 2000));
        
        // Step 3: Type email
        r = await cdp(ws, 'Runtime.evaluate', {
          expression: `(() => {
            const input = document.querySelector('input[type=email], input[placeholder*=email]');
            if (!input) return 'no email input found';
            input.focus();
            input.value = 'claw-agent@proton.me';
            input.dispatchEvent(new Event('input', {bubbles: true}));
            input.dispatchEvent(new Event('change', {bubbles: true}));
            return 'typed email';
          })()`
        });
        console.log('Step 2:', r.result?.result?.value);
        await new Promise(r => setTimeout(r, 500));
        
        // Step 4: Submit
        r = await cdp(ws, 'Runtime.evaluate', {
          expression: `(() => {
            const form = document.querySelector('form');
            if (form) { form.dispatchEvent(new Event('submit', {bubbles: true})); return 'form submitted'; }
            // Try pressing the submit button
            for (const btn of document.querySelectorAll('button[type=submit], button')) {
              if (btn.type === 'submit' || btn.querySelector('svg')) { btn.click(); return 'clicked submit'; }
            }
            return 'no form/submit found';
          })()`
        });
        console.log('Step 3:', r.result?.result?.value);
        console.log('Verification code sent to claw-agent@proton.me — check email');
        break;
      }
      default:
        console.log('Commands: tabs, navigate <url>, screenshot <file>, text, eval <js>, click <selector>, clicktext <text>, type <selector> <text>, newtab <url>, login-chatcut');
    }
  } catch (e) {
    console.error('Error:', e.message);
    process.exit(1);
  }
}

main();
