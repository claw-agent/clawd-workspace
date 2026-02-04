/**
 * Call Webhook Server for Lead Gen
 * Handles inbound webhooks from Twilio and 3CX
 * 
 * Usage: node call-webhook-server.js
 * Port: 3001 (configurable via PORT env)
 */

const http = require('http');
const url = require('url');
const crypto = require('crypto');

// Config (move to env in production)
const PORT = process.env.CALL_WEBHOOK_PORT || 3001;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN || '';
const CX_API_KEY = process.env.CX_API_KEY || '';

// In-memory call log (replace with DB in production)
const callLog = [];

/**
 * Validate Twilio webhook signature
 */
function validateTwilioSignature(req, body) {
  if (!TWILIO_AUTH_TOKEN) return true; // Skip in dev
  
  const signature = req.headers['x-twilio-signature'];
  const fullUrl = `http://localhost:${PORT}${req.url}`;
  
  const params = new URLSearchParams(body);
  const sortedParams = [...params.entries()].sort();
  const paramString = sortedParams.map(([k, v]) => `${k}${v}`).join('');
  
  const expected = crypto
    .createHmac('sha1', TWILIO_AUTH_TOKEN)
    .update(fullUrl + paramString)
    .digest('base64');
    
  return signature === expected;
}

/**
 * Handle Twilio voice webhooks
 */
function handleTwilioVoice(body, res) {
  const params = new URLSearchParams(body);
  const call = {
    id: params.get('CallSid'),
    from: params.get('From'),
    to: params.get('To'),
    status: params.get('CallStatus'),
    direction: params.get('Direction'),
    timestamp: new Date().toISOString(),
    source: 'twilio'
  };
  
  callLog.push(call);
  console.log('[Twilio] Call:', call);
  
  // Return TwiML response
  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="alice">Thank you for calling. Please leave a message after the tone.</Say>
  <Record maxLength="120" transcribe="true" transcribeCallback="/twilio/transcription"/>
  <Say>We did not receive your message. Goodbye.</Say>
</Response>`;

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml);
}

/**
 * Handle Twilio transcription callback
 */
function handleTwilioTranscription(body, res) {
  const params = new URLSearchParams(body);
  const transcription = {
    callId: params.get('CallSid'),
    text: params.get('TranscriptionText'),
    status: params.get('TranscriptionStatus'),
    timestamp: new Date().toISOString()
  };
  
  console.log('[Twilio] Transcription:', transcription);
  
  // TODO: Forward to lead qualification agent
  
  res.writeHead(200);
  res.end('OK');
}

/**
 * Handle Twilio SMS webhooks
 */
function handleTwilioSMS(body, res) {
  const params = new URLSearchParams(body);
  const message = {
    id: params.get('MessageSid'),
    from: params.get('From'),
    to: params.get('To'),
    body: params.get('Body'),
    timestamp: new Date().toISOString(),
    source: 'twilio-sms'
  };
  
  console.log('[Twilio] SMS:', message);
  
  // Return TwiML response (can be empty for no reply)
  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>Thanks for reaching out! A team member will contact you shortly.</Message>
</Response>`;

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml);
}

/**
 * Handle 3CX webhooks
 * 3CX sends JSON payloads for call events
 */
function handle3CXWebhook(body, res) {
  try {
    const event = JSON.parse(body);
    
    const call = {
      id: event.callId || event.id,
      from: event.caller || event.from,
      to: event.callee || event.to,
      status: event.status || event.type,
      duration: event.duration,
      recording: event.recordingUrl,
      timestamp: new Date().toISOString(),
      source: '3cx'
    };
    
    callLog.push(call);
    console.log('[3CX] Event:', call);
    
    // TODO: Forward to lead qualification agent
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'received' }));
    
  } catch (e) {
    console.error('[3CX] Parse error:', e);
    res.writeHead(400);
    res.end('Invalid JSON');
  }
}

/**
 * Handle status/health check
 */
function handleStatus(res) {
  const status = {
    status: 'ok',
    uptime: process.uptime(),
    callsLogged: callLog.length,
    recentCalls: callLog.slice(-5)
  };
  
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(status, null, 2));
}

/**
 * Main request handler
 */
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  let body = '';
  req.on('data', chunk => body += chunk);
  
  req.on('end', () => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${path}`);
    
    try {
      switch (path) {
        case '/health':
        case '/status':
          handleStatus(res);
          break;
          
        case '/twilio/voice':
          if (!validateTwilioSignature(req, body)) {
            res.writeHead(403);
            res.end('Invalid signature');
            return;
          }
          handleTwilioVoice(body, res);
          break;
          
        case '/twilio/sms':
          if (!validateTwilioSignature(req, body)) {
            res.writeHead(403);
            res.end('Invalid signature');
            return;
          }
          handleTwilioSMS(body, res);
          break;
          
        case '/twilio/transcription':
          handleTwilioTranscription(body, res);
          break;
          
        case '/3cx/webhook':
        case '/3cx/call':
          handle3CXWebhook(body, res);
          break;
          
        default:
          res.writeHead(404);
          res.end('Not found');
      }
    } catch (e) {
      console.error('Handler error:', e);
      res.writeHead(500);
      res.end('Internal error');
    }
  });
});

server.listen(PORT, () => {
  console.log(`📞 Call Webhook Server running on port ${PORT}`);
  console.log(`   Twilio Voice: POST /twilio/voice`);
  console.log(`   Twilio SMS:   POST /twilio/sms`);
  console.log(`   3CX Events:   POST /3cx/webhook`);
  console.log(`   Health:       GET  /status`);
});
