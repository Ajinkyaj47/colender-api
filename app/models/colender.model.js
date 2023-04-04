const sql = require("./db.js");

// constructor
const Colender = function(colender) {
  this.title = colender.title;
  this.description = colender.description;
  this.published = colender.published;
};

// get all applications
Colender.get_applications = (form_data, result) => {
 
  let query = `select * from data_store.all_loans_dataset 
  where loan_status='${form_data.get_applications.status}' and partner_id='${global.nbfc}'`;

  /*let query = `select loan_status,loan_id,loan_account_number,loan_date,mobile_number,customer_number,business_addr_line1,bank_sanction_amount,first_name,last_name,CONCAT(ifnull(first_name,'') , ' ' , ifnull(middle_name,'') , ' ' , ifnull(last_name,'')) as name from  data_store.all_loans_dataset 
  where loan_status='${form_data.get_applications.status}' and partner_id='${global.nbfc}'`;*/

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
Colender.incomplete_loan_meta = (form_data,result) => {
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

//get dashboard count
Colender.get_dashboard_count = (form_data,result) => {
  let query = `select loan_status, count(*) as total,IFNULL(SUM(bank_sanction_amount), 0) as bank_sanction_amount,IFNULL(SUM(nbfc_sanction_amount), 0) as nbfc_sanction_amount
  from data_store.all_loans_dataset where colender_nbfc='loantap' and loan_status not in ('null','partial')  group by loan_status;`;

    
    sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("dashboard count: ", res);

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
module.exports = Colender;

/*
Tutorial.create = (newTutorial, result) => {
  sql.query("INSERT INTO tutorials SET ?", newTutorial, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created tutorial: ", { id: res.insertId, ...newTutorial });
    result(null, { id: res.insertId, ...newTutorial });
  });
};

Tutorial.findById = (id, result) => {
  sql.query(`SELECT * FROM tutorials WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found tutorial: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

Tutorial.getAllPublished = result => {
  sql.query("SELECT * FROM tutorials WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tutorials: ", res);
    result(null, res);
  });
};

Tutorial.updateById = (id, tutorial, result) => {
  sql.query(
    "UPDATE tutorials SET title = ?, description = ?, published = ? WHERE id = ?",
    [tutorial.title, tutorial.description, tutorial.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated tutorial: ", { id: id, ...tutorial });
      result(null, { id: id, ...tutorial });
    }
  );
};

Tutorial.remove = (id, result) => {
  sql.query("DELETE FROM tutorials WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted tutorial with id: ", id);
    result(null, res);
  });
};

Tutorial.removeAll = result => {
  sql.query("DELETE FROM tutorials", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} tutorials`);
    result(null, res);
  });
};
*/
