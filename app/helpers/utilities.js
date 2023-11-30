const { json } = require("express");

// convert json into meta key and meta values 
exports.convert_meta_keys_values=(jsonObject)=>{
        // get bank data
        let bank_data = jsonObject.setup_loan.bank_data;
        
        // get nbfc data
        let nbfc_data = jsonObject.setup_loan.bank_data;

        // now remove bank and nbfc data from main json
        delete jsonObject.setup_loan.nbfc_data;
        delete jsonObject.setup_loan.bank_data;

        // Convert the JSON object to an array of [meta_key, meta_value] pairs
          let loan_application_data = Object.entries(jsonObject.setup_loan).map(([meta_key, meta_value]) => ({
            meta_key,
            meta_value
        }));

       
        return loan_application_data;
}

exports.check_basic_validations=(keys_config,form_data)=>{
   var ack = checkRequiredFields(keys_config,form_data)
    return ack;
}

// Function to check if required fields are present
function checkRequiredFields(jsonStructure, jsonData) { 
     for (const key in jsonStructure) {  
        var required_check = jsonStructure[key];
         if(required_check==="required"){
             // Check if the field is required and exists in the second JSON
            if (!jsonData || !jsonData.hasOwnProperty(key) || jsonData[key] === "") {
                let ack = {
                    status_code:"403",
                    status:"error",
                    message:`Required field "${key}" is missing or empty.`
                  }  
                return ack; 
            }
        } 
      }
        let ack = {
            status_code:"200",
            status:"success",
            message:"validation successful done"
          }
          return ack;
  }
 

