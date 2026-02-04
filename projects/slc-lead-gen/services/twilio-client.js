/**
 * Twilio Client for Lead Gen
 * Handles outbound calls, SMS, and call management
 * 
 * Usage:
 *   const twilio = require('./twilio-client');
 *   await twilio.sendSMS('+1234567890', 'Hello!');
 *   await twilio.makeCall('+1234567890', 'https://yourserver.com/twiml');
 */

const Twilio = require('twilio');

// Config from environment
const ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;

// Initialize client (lazy)
let client = null;

function getClient() {
  if (!client) {
    if (!ACCOUNT_SID || !AUTH_TOKEN) {
      throw new Error('Missing TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN');
    }
    client = Twilio(ACCOUNT_SID, AUTH_TOKEN);
  }
  return client;
}

/**
 * Send an SMS message
 */
async function sendSMS(to, body, from = PHONE_NUMBER) {
  const message = await getClient().messages.create({
    body,
    from,
    to
  });
  
  console.log(`[Twilio] SMS sent: ${message.sid}`);
  return message;
}

/**
 * Make an outbound call
 * twimlUrl should return TwiML instructions
 */
async function makeCall(to, twimlUrl, from = PHONE_NUMBER) {
  const call = await getClient().calls.create({
    url: twimlUrl,
    from,
    to
  });
  
  console.log(`[Twilio] Call initiated: ${call.sid}`);
  return call;
}

/**
 * Make a call with inline TwiML (using twiml parameter)
 */
async function makeCallWithTwiml(to, twiml, from = PHONE_NUMBER) {
  const call = await getClient().calls.create({
    twiml,
    from,
    to
  });
  
  console.log(`[Twilio] Call initiated: ${call.sid}`);
  return call;
}

/**
 * Get call details
 */
async function getCall(callSid) {
  return await getClient().calls(callSid).fetch();
}

/**
 * Get call recordings
 */
async function getRecordings(callSid) {
  return await getClient().recordings.list({ callSid });
}

/**
 * List recent calls
 */
async function listCalls(limit = 20) {
  return await getClient().calls.list({ limit });
}

/**
 * List recent messages
 */
async function listMessages(limit = 20) {
  return await getClient().messages.list({ limit });
}

/**
 * Buy a phone number
 */
async function buyNumber(areaCode) {
  const numbers = await getClient().availablePhoneNumbers('US')
    .local
    .list({ areaCode, limit: 1 });
    
  if (numbers.length === 0) {
    throw new Error(`No numbers available in area code ${areaCode}`);
  }
  
  const purchased = await getClient().incomingPhoneNumbers.create({
    phoneNumber: numbers[0].phoneNumber
  });
  
  console.log(`[Twilio] Purchased number: ${purchased.phoneNumber}`);
  return purchased;
}

/**
 * Configure a phone number's webhooks
 */
async function configureNumber(phoneNumberSid, config) {
  return await getClient().incomingPhoneNumbers(phoneNumberSid).update({
    voiceUrl: config.voiceUrl,
    voiceMethod: 'POST',
    smsUrl: config.smsUrl,
    smsMethod: 'POST'
  });
}

/**
 * Generate TwiML for common scenarios
 */
const TwiML = {
  /**
   * Play a message and hang up
   */
  say(message, voice = 'alice') {
    return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="${voice}">${message}</Say>
</Response>`;
  },
  
  /**
   * Play message and record
   */
  sayAndRecord(message, callbackUrl, voice = 'alice') {
    return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="${voice}">${message}</Say>
  <Record maxLength="120" transcribe="true" transcribeCallback="${callbackUrl}"/>
</Response>`;
  },
  
  /**
   * Connect to another number
   */
  dial(number, callerId = PHONE_NUMBER) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Dial callerId="${callerId}">
    <Number>${number}</Number>
  </Dial>
</Response>`;
  },
  
  /**
   * IVR menu
   */
  gather(message, numDigits, actionUrl, voice = 'alice') {
    return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Gather numDigits="${numDigits}" action="${actionUrl}">
    <Say voice="${voice}">${message}</Say>
  </Gather>
  <Say>We didn't receive any input. Goodbye!</Say>
</Response>`;
  }
};

module.exports = {
  sendSMS,
  makeCall,
  makeCallWithTwiml,
  getCall,
  getRecordings,
  listCalls,
  listMessages,
  buyNumber,
  configureNumber,
  TwiML,
  getClient
};
