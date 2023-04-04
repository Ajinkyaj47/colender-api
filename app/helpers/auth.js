const crypto = require('crypto');



// Encrypt data
exports.encryptData=(data,partner_config)=>{

  const secret_key=partner_config.SECRET_KEY ;
  const secret_iv=partner_config.SECRET_IV ;
  const ecnryption_method =partner_config.ECNRYPTION_METHOD ;

  // Generate secret hash with crypto to use for encryption
  const key = crypto
    .createHash('sha512')
    .update(secret_key)
    .digest('hex')
    .substring(0, 32)

  const encryptionIV = crypto
    .createHash('sha512')
    .update(secret_iv)
    .digest('hex')
    .substring(0, 16)
    
  const cipher = crypto.createCipheriv(ecnryption_method, key, encryptionIV)
  return Buffer.from(
    cipher.update(data, 'utf8', 'hex') + cipher.final('hex')
  ).toString('base64') // Encrypts data and converts to hex and base64
}


// Decrypt data
 exports.decryptData=(data)=> {
  const secret_key=partner_config.SECRET_KEY ;
  const secret_iv=partner_config.SECRET_IV ;
  const ecnryption_method =partner_config.ECNRYPTION_METHOD ;

  // Generate secret hash with crypto to use for encryption
  const key = crypto
    .createHash('sha512')
    .update(secret_key)
    .digest('hex')
    .substring(0, 32)

  const encryptionIV = crypto
    .createHash('sha512')
    .update(secret_iv)
    .digest('hex')
    .substring(0, 16)
  
    
  const buff = Buffer.from(data, 'base64')
  // Converts encrypted data to utf8
  const decipher = crypto.createDecipheriv(ecnryption_method, key, encryptionIV)
  return (
    decipher.update(buff.toString('utf8'), 'hex', 'utf8') +
    decipher.final('utf8')
  ) 
}

/*
  p1 - time current time
*/