# tokengenius

TokenGenius is a versatile and secure Node.js and browser-compatible package for generating random tokens. With customizable token lengths, various token types (numeric, alphabetic, hex), and the ability to define your own character set, TokenGenius empowers developers to create unique and tailored tokens for a wide range of applications.

# Installation

`npm i @shasvinth/tokengenius`

# Usage:

```
const generateRandomToken = require('@shasvinth/tokengenius');

// Generate a default hex token
const defaultToken = generateRandomToken();
console.log('Default Token:', defaultToken);

// Generate a numeric token with custom length
const numericToken = generateRandomToken(8, 'numeric');
console.log('Numeric Token:', numericToken);

// Generate an alphabetic token with custom character set
const customCharacterSetToken = generateRandomToken(12, 'alphabetic', 'ABC!@');
console.log('Custom Character Set Token:', customCharacterSetToken);

// Generate a token with expiry time of 10 seconds
const tokenWithExpiry = generateRandomToken(16, 'alphabetic', undefined, 10);
console.log('Token with Expiry:', tokenWithExpiry);
```

# Options:

`length` (optional): Desired length of the token in characters (default is 32).

`type` (optional): Token type (`numeric`, `alphabetic`, `hex`). Default is hex.

`customCharacters` (optional): Custom character set for token generation.

# Compatibility:
TokenGenius works seamlessly in both Node.js and browser environments. In browsers, it leverages the `crypto.getRandomValues` method for enhanced security.

