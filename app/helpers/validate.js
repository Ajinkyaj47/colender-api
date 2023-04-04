

exports.mandate_data = (data)=>{
  ack={
    message:"data found",
    status_code:"200",
    status:"success"
}

    // check basic data validation
    if(!data.product_id){
        ack={
            message:"Product ID is required",
            status_code:"501",
            status:"error"
        }
        return ack;
    }

    // check api key
    if(!data.api_auth){
       ack={
            message: "API auth is required",
            status_code:"501",
            status:"error"
            }
        return ack;
    }

    // check nbfc data
    if(!data.nbfc){
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
