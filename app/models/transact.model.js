const sql = require("./db.js");

// constructor
const Transact = function(transact) {
  this.title = transact.title;
  this.description = transact.description;
  this.published = transact.published;
};

// setup loan
Transact.setup_loan = (req_data,result) => {

  
 console.log(req_data);
 return;
  let query = ''; 

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    
    console.log("loan_applications: ", res);
    let ack = {
      status_code:"200",
      status:"success",
      message:"Applications found successfully",
      data: res
    }
    result(null, ack);
  });
};
 
// export transact
module.exports = Transact;
