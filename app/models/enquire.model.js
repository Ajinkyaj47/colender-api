const sql = require("./db.js");

// constructor
const Enquire = function(enquire) {
  this.title = enquire.title;
  this.description = enquire.description;
  this.published = enquire.published;
};

// get all applications
Enquire.get_applications = (form_data, result) => {
 
  let query = `select * from data_store.all_loans_dataset 
  where loan_status='${form_data.get_applications.status}' and partner_id='${global.nbfc}'`; 

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

// get incomplete applications
Enquire.incomplete_loan_meta = (form_data,result) => {
  let query = `select * from incomplete_loan_meta`;

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    let ack = {
      status_code:"200",
      status:"success",
      message:"Incomplete applications found successfully",
      data: res
    }
    result(null, ack);
  });
};

// get dashboard count
Enquire.get_dashboard_count = (form_data,result) => {
  let query = `select loan_status, count(*) as total,IFNULL(SUM(bank_sanction_amount), 0) as bank_sanction_amount,IFNULL(SUM(nbfc_sanction_amount), 0) as nbfc_sanction_amount
  from data_store.all_loans_dataset where colender_nbfc='loantap' and loan_status not in ('null','partial')  group by loan_status;`;

    sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    let ack = {
      status_code:"200",
      status:"success",
      message:"Dashboard count get successfully",
      data: res
    }
    result(null, ack);
  });
};


// export data
module.exports = Enquire;
