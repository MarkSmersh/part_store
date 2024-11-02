import crypto from 'crypto';

// process.env.JWT_TOKEN
console.log(crypto.randomBytes(64).toString('hex'));
