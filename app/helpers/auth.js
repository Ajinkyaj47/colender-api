const crypto = require('crypto');

// Encrypt data
exports.encryptData = (data,partner_config) => {
  //let data =Math.floor(Date.now() / 1000);
  const secret_key=partner_config.SECRET_KEY ;
  const secret_iv=partner_config.SECRET_IV ;
  const ecnryption_method =partner_config.ECNRYPTION_METHOD ;

    try{
      var cipher = crypto.createCipheriv(ecnryption_method, secret_key, secret_iv)
      var crypted = cipher.update(data,'utf8','base64')
      crypted += cipher.final('base64');
      return crypted;  
    }catch(err){
      ack={
        message:"Unautorized access",
        status_code:"501",
        status:"error"
    }
    return ack;
    }
  
}

// Decrypt data
 exports.decryptData = (data,partner_config) => {
  const secret_key=partner_config.SECRET_KEY ;
  const secret_iv=partner_config.SECRET_IV ;
  const ecnryption_method =partner_config.ECNRYPTION_METHOD ;
  try{
    // Converts encrypted data to utf8
    const decipher = crypto.createDecipheriv(ecnryption_method, secret_key, secret_iv);
    var decrypted = decipher.update(data, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }catch(err){
    ack={
        message:"Unautorized access",
        status_code:"501",
        status:"error"
   }
  return ack;
  }
}
