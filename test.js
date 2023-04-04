
const crypto = require('crypto');
function encryptData(){
      let data =Math.floor(Date.now() / 1000);
      data = "1680544786"



        const secret_key="Xv0ni837ZBAQYcN5t0ZGnJKTFqmtzeTE" ;
        const secret_iv="0ed9c2aa27a31693" ;
        const ecnryption_method ="aes-256-cbc" ;
      
        // Generate secret hash with crypto to use for encryption
      /*  const key = crypto
          .createHash('sha256')
          .update(secret_key)
          .digest('base64')
          .substring(0, 32)
      
        const encryptionIV = crypto
          .createHash('sha256')
          .update(secret_iv)
          .digest('base64')
          .substring(0, 16)
          */
   

            var cipher = crypto.createCipheriv('aes-256-cbc', secret_key, secret_iv)
            var crypted = cipher.update(data,'utf8','base64')
            crypted += cipher.final('base64');
        
             
            return crypted;

         // Encrypts data and converts to hex and base64
      
}

let a = encryptData();

console.log(a)