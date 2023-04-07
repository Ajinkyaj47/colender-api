
const Auth = require("../helpers/auth.js");

exports.mandate_data = (data)=>{

  // default ack response
  ack={
    message:"data found",
    status_code:"200",
    status:"success"
  } 

  // check basic data validation
  if(data.product_id==''){
      ack={
          message:"Product ID is required",
          status_code:"501",
          status:"error"
      }
      return ack;
  }

  // check api key
  if(data.api_auth==''){
      ack={
          message: "API auth is required",
          status_code:"501",
          status:"error"
          }
      return ack;
  }

  // check nbfc data
  if(data.nbfc==''){
      ack = 
      {
          message: "NBFC is required",
          status_code:"501",
          status:"error"
      }
      return ack ;
  }
  
  // load partner configuration
  try{
    const partner_config = require(`../config/all-partners/${data.nbfc}.js`);

    if(!partner_config.product_name_mapping[data.product_id]){
      ack=
      {
        message: "Invalid product id is given.",
        status_code:"501",
        status:"error"
      }
    return ack;
    } 

    let auth_ack = Auth.decryptData(data.api_auth,partner_config);
    if(auth_ack.status ==="error"){
      return auth_ack;
    } 

    return ack;

   }catch(err){
    ack=
      {
        message: "Valid NBFC is required",
        status_code:"501",
        status:"error"
      }
    return ack;
   }

}
