# Telephony Setup Guide

## Overview

The lead gen system uses two telephony providers:
- **Twilio**: Primary for programmable voice/SMS, transcription
- **3CX**: Optional PBX integration for call routing, IVR

## Twilio Setup

### 1. Create Account
1. Go to [twilio.com](https://twilio.com)
2. Create account (free trial includes $15 credit)
3. Verify your phone number

### 2. Get Credentials
1. Dashboard → Account Info
2. Copy **Account SID** and **Auth Token**
3. Add to `.env` file

### 3. Buy a Phone Number
1. Phone Numbers → Buy a Number
2. Choose area code (local to SLC: 801, 385)
3. Ensure Voice and SMS capabilities
4. Copy number to `.env`

### 4. Configure Webhooks
1. Phone Numbers → Manage → Active Numbers
2. Click your number
3. Set Voice webhook: `https://your-domain.com/twilio/voice`
4. Set SMS webhook: `https://your-domain.com/twilio/sms`
5. Method: POST

### 5. Enable Transcription (Optional)
1. Voice → Settings → Transcription
2. Enable automatic transcription
3. Set transcription callback URL

## 3CX Setup (Optional)

### 1. Get 3CX Instance
- Cloud: [3cx.com](https://3cx.com) (free for small teams)
- Self-hosted: Install on your own server

### 2. Configure API Access
1. Admin → API → Generate API Key
2. Copy key to `.env`

### 3. Set Up Webhook
1. Admin → Integrations → Webhooks
2. Add new webhook
3. URL: `https://your-domain.com/3cx/webhook`
4. Events: Call Started, Call Ended, Call Recorded

## Local Development

### Using ngrok
```bash
# Install ngrok
brew install ngrok

# Start tunnel
ngrok http 3001

# Use the https URL in Twilio/3CX config
# Example: https://abc123.ngrok.io/twilio/voice
```

### Start Webhook Server
```bash
cd ~/clawd/projects/slc-lead-gen/services
source ../.env  # Load environment variables
node call-webhook-server.js
```

### Test Endpoints
```bash
# Health check
curl http://localhost:3001/status

# Simulate Twilio voice webhook
curl -X POST http://localhost:3001/twilio/voice \
  -d "CallSid=CA123&From=+1234567890&To=+0987654321&CallStatus=ringing"

# Simulate 3CX webhook
curl -X POST http://localhost:3001/3cx/webhook \
  -H "Content-Type: application/json" \
  -d '{"callId":"123","caller":"+1234567890","status":"answered"}'
```

## Usage Examples

### Send SMS
```javascript
const twilio = require('./twilio-client');

await twilio.sendSMS('+1234567890', 'Hi! Following up on your inquiry.');
```

### Make Call with Message
```javascript
const twilio = require('./twilio-client');

const twiml = twilio.TwiML.say('Hello! This is a call from SLC Lead Gen.');
await twilio.makeCallWithTwiml('+1234567890', twiml);
```

### Make Call with Recording
```javascript
const twiml = twilio.TwiML.sayAndRecord(
  'Please leave a message after the tone.',
  'https://your-domain.com/twilio/transcription'
);
await twilio.makeCallWithTwiml('+1234567890', twiml);
```

## Cost Estimates (Twilio)

| Service | Cost |
|---------|------|
| Phone Number | $1.15/month |
| Outbound SMS | $0.0079/message |
| Inbound SMS | $0.0075/message |
| Outbound Call | $0.014/min |
| Inbound Call | $0.0085/min |
| Transcription | $0.05/min |

## Troubleshooting

### Webhook not receiving calls
1. Check ngrok is running
2. Verify webhook URL in Twilio console
3. Check Twilio debugger for errors

### Transcription not working
1. Enable transcription in Twilio console
2. Ensure callback URL is accessible
3. Check call recording is enabled

### 3CX not connecting
1. Verify API key is valid
2. Check firewall allows outbound connections
3. Ensure webhook URL is whitelisted
