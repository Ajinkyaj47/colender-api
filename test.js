
const crypto = require('crypto');
const { connected } = require('process');

function encryptData(){
      let data =Math.floor(Date.now() / 1000);
      data = "Shree Ram"
      const secret_key="Xv0ni837ZBAQYcN5t0ZGnJKTFqmtzeTE" ;
      const secret_iv="0ed9c2aa27a31693" ;
      const ecnryption_method ="aes-256-cbc" ; 

      var cipher = crypto.createCipheriv(ecnryption_method, secret_key, secret_iv)
      var crypted = cipher.update(data,'utf8','base64')
      crypted += cipher.final('base64');
      return crypted;  
       
}



// Decrypt data
function decryptData(data){

  const secret_key="Xv0ni837ZBAQYcN5t0ZGnJKTFqmtzeTE" ;
  const secret_iv="0ed9c2aa27a31693" ;
  const ecnryption_method ="aes-256-cbc" ; 
   

  // Converts encrypted data to utf8
  const decipher = crypto.createDecipheriv(ecnryption_method, secret_key, secret_iv);
  
  var decrypted = decipher.update(data, 'base64', 'utf8');
  decrypted += decipher.final('utf8');
   return decrypted;
  
}

// encryption of data
let a = encryptData();
console.log(a);
 
// decryption of data
let b = decryptData(a);
console.log(b);  


 