const utilities = require("../helpers/utilities.js");
var mysql = require('mysql');
const dbConfig = require(`../config/all-partners/${global.database}.js`); 

let config = {
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  multipleStatements: true,
};

const pool = mysql.createPool(config);

// constructor
const Transact = function(transact) { 
};

// setup loan
Transact.setup_loan = (form_data,partner_config,result) => {
  
 // check basic validation
  var ack = utilities.check_basic_validations(partner_config.loan_keyset.self_employed,form_data.setup_loan);
  if(ack.status == 'error') {
      result(null, ack); return;
    }else{
    //convert json into meta key and meta values
    var meta_data =  utilities.convert_meta_keys_values(form_data);
    let object_id=generateRandomLoanId();

    const additionalValues = ['ajinkya@loantap.in', 'LOAN'+object_id, 'loan', 'applcation_details'];

    // Process each element in the JSON array
    const processedData = [];
    meta_data.forEach(item => {
      let loan_id="LOAN"+object_id;
      // Create a new array with existing values and additional values
      let str = `('ajinkya@loantap.in', '${loan_id}', 'loan', 'applcation_details','${item.meta_key}','${item.meta_value}')`;

      processedData.push(str);
    });

    const resultString = processedData.join(', ');

    let sql = `insert into loan_meta (updated_by,object_id,coll_id,coll_type,meta_key,meta_value)values ${resultString}`;
     
    // Example usage
     performQuery(sql, (err, response) => {
        if (err) {
          result(null, err); return;
         } else {
          ack={
            "status_code": "200",
            "status": "success",
            "message": "Record inserted successfully",
          }
          result(null, ack); return;
        }
        })
  }


  // Example function to perform a query
function performQuery(sql, resultCallback) {
  pool.getConnection((err, connection) => {
    if (err) {
      // Handle connection error
      return resultCallback(err, null);
    }

    // Perform the query
    connection.query(sql, (queryErr, result) => {
      // Release the connection back to the pool
      connection.release();

      if (queryErr) {
        // Handle query error
        return resultCallback(queryErr, null);
      }

      // Call the result callback
      resultCallback(null, result);
    });
  });
}


  function generateRandomLoanId() {
  const min = 1000000000000000; // 10^15
  const max = 9999999999999999; // 10^16 - 1
  return Math.floor(Math.random() * (max - min + 1)) + min;  
  }
   
  /*
    1.check the keys in config 
    2.check required fields
    3.validate the data like pan mobile etc
    4.check share of 80 and 20 as per there product
  */

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


// setup loan
Transact.update_loan = (form_data,partner_config,result) => {
  
  // check basic validation
   var ack = utilities.check_basic_validations(partner_config.loan_keyset.self_employed,form_data.setup_loan);
   if(ack.status == 'error') {
       result(null, ack); return;
     }else{
     //convert json into meta key and meta values
     var meta_data =  utilities.convert_meta_keys_values(form_data);
     let object_id=generateRandomLoanId();
 
     const additionalValues = ['ajinkya@loantap.in', 'LOAN'+object_id, 'loan', 'applcation_details'];
 
     // Process each element in the JSON array
     const processedData = [];
     meta_data.forEach(item => {
       let loan_id="LOAN"+object_id;
       // Create a new array with existing values and additional values
       let str = `('ajinkya@loantap.in', '${loan_id}', 'loan', 'applcation_details','${item.meta_key}','${item.meta_value}')`;
 
       processedData.push(str);
     });
 
     const resultString = processedData.join(', ');
 
     let sql = `insert into loan_meta (updated_by,object_id,coll_id,coll_type,meta_key,meta_value)values ${resultString}`;
      
     // Example usage
      performQuery(sql, (err, response) => {
         if (err) {
           result(null, err); return;
          } else {
           ack={
             "status_code": "200",
             "status": "success",
             "message": "Record inserted successfully",
           }
           result(null, ack); return;
         }
         })
   }
 
 
   // Example function to perform a query
 function performQuery(sql, resultCallback) {
   pool.getConnection((err, connection) => {
     if (err) {
       // Handle connection error
       return resultCallback(err, null);
     }
 
     // Perform the query
     connection.query(sql, (queryErr, result) => {
       // Release the connection back to the pool
       connection.release();
 
       if (queryErr) {
         // Handle query error
         return resultCallback(queryErr, null);
       }
 
       // Call the result callback
       resultCallback(null, result);
     });
   });
 } 
 
  function generateRandomLoanId() {
    const min = 1000000000000000; // 10^15
    const max = 9999999999999999; // 10^16 - 1
    return Math.floor(Math.random() * (max - min + 1)) + min;  
  } 
 
 };
 
// export transact
module.exports = Transact;