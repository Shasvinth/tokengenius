// index.js
function generateRandomToken(length = 32, type = 'hex', customCharacters, expirySeconds) {
  if (length <= 0) {
    throw new Error('Token length must be greater than zero');
  }

  let characters;
  if (customCharacters) {
    characters = customCharacters;
  } else {
    if (type === 'numeric') {
      characters = '0123456789';
    } else if (type === 'alphabetic') {
      characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    } else if (type === 'hex') {
      characters = '0123456789abcdef';
    } else {
      throw new Error('Invalid token type. Supported types: numeric, alphabetic, hex');
    }
  }

  const tokenLength = length;
  let token = '';

  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    // Browser environment with crypto support
    const values = new Uint8Array(tokenLength);
    crypto.getRandomValues(values);

    for (let i = 0; i < tokenLength; i++) {
      token += characters[values[i] % characters.length];
    }
  } else if (typeof require === 'function') {
    // Node.js environment
    const crypto = require('crypto');
    
    for (let i = 0; i < tokenLength; i++) {
      const randomByte = crypto.randomBytes(1).readUInt8(0);
      token += characters[randomByte % characters.length];
    }
  } else {
    // Fallback for environments without crypto support
    for (let i = 0; i < tokenLength; i++) {
      const randomByte = Math.floor(Math.random() * 256);
      token += characters[randomByte % characters.length];
    }
  }

  // Expiry time handling
  if (expirySeconds) {
    const expiryDate = new Date();
    expiryDate.setSeconds(expiryDate.getSeconds() + expirySeconds);
    token += `_${expiryDate.toISOString()}`;
  }

  return token;
}

module.exports = generateRandomToken;
