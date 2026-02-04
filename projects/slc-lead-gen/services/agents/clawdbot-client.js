/**
 * Clawdbot Client
 * 
 * Wraps the Clawdbot CLI to spawn agent sessions and get responses.
 * This replaces direct Anthropic API calls with Clawdbot's sessions_spawn mechanism,
 * which uses the existing Claude subscription via the gateway.
 * 
 * Usage:
 *   const { sendPrompt } = require('./clawdbot-client');
 *   const response = await sendPrompt('Analyze this website...', { sessionId: 'research-123' });
 */

const { execSync, spawn } = require('child_process');
const crypto = require('crypto');

/**
 * Generate a unique session ID for this request
 * @param {string} prefix - Prefix for the session ID
 * @returns {string} - Unique session ID
 */
function generateSessionId(prefix = 'slc') {
  const timestamp = Date.now().toString(36);
  const random = crypto.randomBytes(4).toString('hex');
  return `${prefix}-${timestamp}-${random}`;
}

/**
 * Send a prompt to Claude via Clawdbot gateway
 * @param {string} prompt - The prompt to send
 * @param {object} options - Options
 * @param {string} options.sessionId - Session ID (generated if not provided)
 * @param {number} options.timeout - Timeout in seconds (default 180)
 * @param {boolean} options.verbose - Enable verbose output
 * @returns {Promise<string>} - The response text
 */
async function sendPrompt(prompt, options = {}) {
  const sessionId = options.sessionId || generateSessionId();
  const timeout = options.timeout || 180;
  
  return new Promise((resolve, reject) => {
    // Build the command
    const args = [
      'agent',
      '--message', prompt,
      '--session-id', sessionId,
      '--json',
      '--timeout', timeout.toString()
    ];
    
    if (options.verbose) {
      console.log(`   🦞 Clawdbot session: ${sessionId}`);
    }
    
    // Spawn clawdbot process
    const proc = spawn('clawdbot', args, {
      env: { ...process.env },
      stdio: ['pipe', 'pipe', 'pipe'],
      timeout: (timeout + 30) * 1000  // Add buffer to CLI timeout
    });
    
    let stdout = '';
    let stderr = '';
    
    proc.stdout.on('data', (data) => {
      stdout += data.toString();
    });
    
    proc.stderr.on('data', (data) => {
      stderr += data.toString();
    });
    
    proc.on('close', (code) => {
      if (code !== 0) {
        // Try to extract error from stderr or stdout
        const errorMsg = stderr || stdout || `Clawdbot exited with code ${code}`;
        reject(new Error(`Clawdbot failed: ${errorMsg.substring(0, 500)}`));
        return;
      }
      
      try {
        // Parse JSON response
        const result = JSON.parse(stdout);
        
        if (result.status !== 'ok') {
          reject(new Error(`Clawdbot error: ${result.summary || 'Unknown error'}`));
          return;
        }
        
        // Extract text from payloads
        const text = result.result?.payloads?.[0]?.text || '';
        
        if (!text) {
          reject(new Error('Empty response from Clawdbot'));
          return;
        }
        
        resolve(text);
      } catch (parseError) {
        // If JSON parsing fails, check if there's useful content in stdout
        if (stdout.includes('"text"')) {
          // Try to extract just the text field
          const textMatch = stdout.match(/"text":\s*"([^"]+)"/);
          if (textMatch) {
            resolve(textMatch[1]);
            return;
          }
        }
        reject(new Error(`Failed to parse Clawdbot response: ${parseError.message}\nOutput: ${stdout.substring(0, 500)}`));
      }
    });
    
    proc.on('error', (err) => {
      reject(new Error(`Failed to spawn Clawdbot: ${err.message}`));
    });
  });
}

/**
 * Send a prompt and parse the response as JSON
 * @param {string} prompt - The prompt (should request JSON output)
 * @param {object} options - Options (same as sendPrompt)
 * @returns {Promise<object>} - Parsed JSON response
 */
async function sendPromptForJson(prompt, options = {}) {
  const responseText = await sendPrompt(prompt, options);
  
  // Try to extract JSON from the response
  // The response might have text before/after the JSON
  const jsonMatch = responseText.match(/\{[\s\S]*\}/);
  
  if (!jsonMatch) {
    throw new Error('No JSON found in response');
  }
  
  try {
    return JSON.parse(jsonMatch[0]);
  } catch (parseError) {
    throw new Error(`Failed to parse JSON: ${parseError.message}\nResponse: ${responseText.substring(0, 500)}`);
  }
}

/**
 * Create a messages-compatible interface that uses Clawdbot
 * This allows drop-in replacement for Anthropic SDK's messages.create
 */
const messages = {
  /**
   * Create a message (compatible with Anthropic SDK)
   * @param {object} params - Message parameters
   * @param {string} params.model - Model name (ignored, uses gateway default)
   * @param {number} params.max_tokens - Max tokens (used as hint for timeout)
   * @param {Array} params.messages - Messages array
   * @returns {Promise<object>} - Response in Anthropic SDK format
   */
  async create(params) {
    // Extract the prompt from messages
    // Anthropic format: [{ role: 'user', content: 'prompt' }]
    const userMessage = params.messages.find(m => m.role === 'user');
    if (!userMessage) {
      throw new Error('No user message found');
    }
    
    const prompt = userMessage.content;
    
    // Calculate timeout based on max_tokens (rough estimate)
    const timeout = Math.max(120, Math.min(300, Math.round((params.max_tokens || 4000) / 20)));
    
    const sessionId = generateSessionId('agent');
    
    try {
      const text = await sendPrompt(prompt, { sessionId, timeout });
      
      // Return in Anthropic SDK format
      return {
        content: [{ type: 'text', text }],
        model: params.model || 'claude-via-clawdbot',
        stop_reason: 'end_turn',
        usage: {
          input_tokens: 0,  // Not available via CLI
          output_tokens: 0
        }
      };
    } catch (error) {
      throw error;
    }
  }
};

module.exports = {
  sendPrompt,
  sendPromptForJson,
  generateSessionId,
  messages
};
