const crypto = require('crypto');

var passphrase = 'Xv0ni837ZBAQYcN5t0ZGnJKTFqmtzeTE';
var iv = '0ed9c2aa27a31693';
var text = '1680544786';

var cipher = crypto.createCipheriv('aes-256-cbc', passphrase, iv)
var crypted = cipher.update(text,'utf8','base64')
crypted += cipher.final('base64');

/*
var cipher = crypto.createCipheriv('aes-256-cbc', passphrase, iv)
var crypted = cipher.update(text,'utf8','hex')
crypted += cipher.final('hex');
*/

var result = crypted + ':' + iv;

console.log('crypted: (' + crypted.length + ' chars)', crypted);
// crypted: (32 chars) b94107e56900ec8270a847bbf457eaa6

