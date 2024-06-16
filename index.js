const crypto = typeof require !== 'undefined' ? require('crypto') : null;

function generateRandomToken(length = 32, type = 'hex', customCharacters, expirySeconds) {
  if (length <= 0) {
    throw new Error('Token length must be greater than zero');
  }

  let characters;
  if (customCharacters) {
    characters = customCharacters;
  } else {
    switch (type) {
      case 'numeric':
        characters = '0123456789';
        break;
      case 'alphabetic':
        characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        break;
      case 'hex':
        characters = '0123456789abcdef';
        break;
      case 'alphanumeric':
        characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        break;
      case 'special':
        characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+[]{}|;:,.<>?';
        break;
      default:
        throw new Error('Invalid token type. Supported types: numeric, alphabetic, hex, alphanumeric, special');
    }
  }

  const tokenLength = length;
  let token = '';

  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const values = new Uint8Array(tokenLength);
    crypto.getRandomValues(values);
    for (let i = 0; i < tokenLength; i++) {
      token += characters[values[i] % characters.length];
    }
  } else if (crypto) {
    for (let i = 0; i < tokenLength; i++) {
      const randomByte = crypto.randomBytes(1).readUInt8(0);
      token += characters[randomByte % characters.length];
    }
  } else {
    for (let i = 0; i < tokenLength; i++) {
      const randomByte = Math.floor(Math.random() * 256);
      token += characters[randomByte % characters.length];
    }
  }

  if (expirySeconds) {
    const expiryDate = new Date();
    expiryDate.setSeconds(expiryDate.getSeconds() + expirySeconds);
    token += `_${expiryDate.toISOString()}`;
  }

  return token;
}

function validateToken(token, customCharacters) {
  const parts = token.split('_');
  const actualToken = parts[0];
  const expiryDate = parts[1] ? new Date(parts[1]) : null;

  if (expiryDate && new Date() > expiryDate) {
    return false;
  }

  if (customCharacters) {
    for (let char of actualToken) {
      if (!customCharacters.includes(char)) {
        return false;
      }
    }
  }

  return true;
}

function checkExpiry(token) {
  const parts = token.split('_');
  const expiryDate = parts[1] ? new Date(parts[1]) : null;

  if (!expiryDate) {
    return false;
  }

  return new Date() > expiryDate;
}

module.exports = {
  generateRandomToken,
  validateToken,
  checkExpiry,
};
