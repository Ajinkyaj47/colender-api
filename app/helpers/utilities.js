
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
        
        
          nbfc_data = Object.entries(nbfc_data).map(([meta_key, meta_value]) => ({
            meta_key,
            meta_value
        }));

          bank_data = Object.entries(bank_data).map(([meta_key, meta_value]) => ({
            meta_key,
            meta_value
        })); 

        console.log(loan_application_data)
        console.log(nbfc_data)
        console.log(bank_data) 
}