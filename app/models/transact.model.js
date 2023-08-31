const database = require("../helpers/db_lib.js");
const utilities = require("../helpers/utilities.js");


// constructor
const Transact = function(transact) {
 
};

// setup loan
Transact.setup_loan = (form_data,result) => {
  utilities.convert_meta_keys_values(form_data);
 // let key_set = form_data.partner_config.loan_keyset.self_employed;
/*  let rows = "";  

    let ack = {
      status_code:"200",
      status:"success",
      message:"Applications found successfully",
      data: rows
    }
    result(null, ack); */

};
 
// export transact
module.exports = Transact;
