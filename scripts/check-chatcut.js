#!/usr/bin/env node
// Check ChatCut Seedance generation status
const WebSocket=require('ws'),fs=require('fs'),http=require('http');
function get(u){return new Promise((r,j)=>{http.get(u,s=>{let d='';s.on('data',c=>d+=c);s.on('end',()=>r(JSON.parse(d)));}).on('error',j)})}
function cdp(ws,m,p){const id=Math.floor(Math.random()*1e5);return new Promise(r=>{const h=d=>{const msg=JSON.parse(d.toString());if(msg.id===id){ws.off('message',h);r(msg)}};ws.on('message',h);ws.send(JSON.stringify({id,method:m,params:p}))})}

(async()=>{
  const targets=await get('http://127.0.0.1:9222/json');
  const chatcut=targets.find(t=>t.url.includes('chatcut'));
  if(!chatcut){console.log('NO_CHATCUT_TAB');process.exit(1)}
  const ws=new WebSocket(chatcut.webSocketDebuggerUrl);
  await new Promise(r=>ws.on('open',r));
  
  // Check for video elements or download links
  const r=await cdp(ws,'Runtime.evaluate',{expression:`(() => {
    const videos=document.querySelectorAll('video');
    const downloads=[...document.querySelectorAll('a')].filter(a=>a.href&&(a.href.includes('.mp4')||a.href.includes('download')));
    const text=document.body.innerText;
    const hasMedia=!text.includes('No media added');
    const status=text.includes('complete')||text.includes('Complete')||text.includes('ready')||text.includes('Ready');
    return JSON.stringify({videos:videos.length,downloads:downloads.length,hasMedia,status,snippet:text.slice(0,300)});
  })()`});
  
  const data=JSON.parse(r.result?.result?.value||'{}');
  if(data.videos>0||data.hasMedia||data.status){
    console.log('READY:',JSON.stringify(data));
    const ss=await cdp(ws,'Page.captureScreenshot',{format:'png'});
    fs.writeFileSync('/tmp/chatcut-done.png',Buffer.from(ss.result.data,'base64'));
  } else {
    console.log('PENDING:',data.snippet?.slice(0,150));
  }
  ws.close();
})().catch(e=>console.error(e.message));
