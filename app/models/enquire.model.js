const mysql = require("mysql");
const knex = require('knex');
const config = require("./db.js");
const knexInstance = knex(config.development);

// constructor
const Enquire = function(enquire) {
  
};

// get all applications
Enquire.get_applications = (form_data,result) => {

  //select applciation from data store all loan dataset 
  knexInstance.select().from('data_store.all_loans_dataset')
  .where('loan_status',`${form_data.get_applications.status}`).
  andWhere('partner_id',`${global.nbfc}`).then((rows) => {
    let ack = {
      status_code:"200",
      status:"success",
      message:"Applications found successfully",
      data: rows
    }
    result(null, ack); 
    return;
  })
  .catch((error) => {
    console.error(error);
  });
};

// get incomplete applications
Enquire.incomplete_loan_meta = (form_data,result) => {

  knexInstance.select().from('incomplete_loan_meta').then((rows) => {
    let ack = {
      status_code:"200",
      status:"success",
      message:"Incomplete Applications found successfully",
      data: rows
    }
    result(null, ack); 
    return;
  })
  .catch((error) => {
    console.error(error);
  });
};

// get dashboard count
Enquire.get_dashboard_count = (form_data,result) => {
  
  knexInstance.select(
    'loan_status',
    knexInstance.raw('count(*) as total'),
    knexInstance.raw('IFNULL(SUM(bank_sanction_amount), 0) as bankSanctionAmount'),
    knexInstance.raw('IFNULL(SUM(nbfc_sanction_amount), 0) as nbfcSanctionAmount')
  ).groupBy('loan_status').from('data_store.all_loans_dataset').then((rows) => {
    let ack = {
      status_code:"200",
      status:"success",
      message:"Dashboard Count get successfully",
      data: rows
    }
    result(null, ack); 
    return;
  })
  .catch((error) => {
    console.error(error);
  });
};

// get dashboard count
Enquire.get_application_details = (form_data,result) => {
  
  knexInstance.select()
  .from('data_store.all_loans_dataset')
  .where('loan_id',`${form_data.get_application_details.loan_id}`)
  .then((rows)=>{
    let ack = {
      status_code:"200",
      status:"success",
      message:"Application details get successfully",
      data: rows
    }
    result(null, ack); 
    return;
  })
  .catch((error) => {
    console.error(error);
  }); 
};

//get user list 
Enquire.get_user_list=function(form_data,result){
  const partner_config = require(`../config/all-partners/${global.nbfc}.js`);
  const table_name = `${partner_config.master_database}.common_meta` ;
    //global.nbfc
    const rawQuery = `with a1 as (
      select coll_id as user_id
      from 
      ${table_name}
      where 
      object_id = '${partner_config.partner_id}' and coll_type='partner_user'
      ),
      q1 as (select a1.* from a1 left join ${table_name} on a1.user_id=${table_name}.coll_id),
      q2 as (
      select q1.*, meta_value as mobile_number
      from q1
      left join ${table_name} on ${table_name}.coll_id=q1.user_id
      where meta_key='mobile_number'
      ),
      q3 as (
      select q2.*, meta_value as user_role
      from q2
      left join ${table_name} on ${table_name}.coll_id=q2.user_id
      where meta_key='user_role'
      ),
      q4 as (
      select q3.*, meta_value as name
      from q3
      left join ${table_name} on ${table_name}.coll_id=q3.user_id
      where meta_key='name'
      ),
      q6 as (
      select q4.*, meta_value as branch_code
      from q4
      left join ${table_name} on ${table_name}.coll_id=q4.user_id
      where meta_key='branch_code'
      ),
      q7 as (
      select q6.*, meta_value as pf_number
      from q6
      left join ${table_name} on ${table_name}.coll_id=q6.user_id
      where meta_key='pf_number'
      )
      select * from q7 group by user_id;`;

    
    knexInstance.raw(rawQuery).then((rows) => {
      let ack = {
        status_code:"200",
        status:"success",
        message:"User List get successfully",
        data: rows[0]
      }
      result(null, ack); 
      return;
    })
    .catch((error) => {
      console.error(error);
    });
 
   
 
};

//get user details
Enquire.get_user_details=function(form_data,result){

  const partner_config = require(`../config/all-partners/${global.nbfc}.js`);
  const table_name = `${partner_config.master_database}.common_meta` ;

    //global.nbfc
    const rawQuery = `with a1 as (
      select coll_id as user_id
      from 
      ${table_name}
      where 
      coll_id = '${form_data.get_user_details.user_id}' and coll_type='partner_user'
      ),
      q1 as (select a1.* from a1 left join ${table_name} on a1.user_id=${table_name}.coll_id),
      q2 as (
      select q1.*, meta_value as mobile_number
      from q1
      left join ${table_name} on ${table_name}.coll_id=q1.user_id
      where meta_key='mobile_number'
      ),
      q3 as (
      select q2.*, meta_value as user_role
      from q2
      left join ${table_name} on ${table_name}.coll_id=q2.user_id
      where meta_key='user_role'
      ),
      q4 as (
      select q3.*, meta_value as name
      from q3
      left join ${table_name} on ${table_name}.coll_id=q3.user_id
      where meta_key='name'
      ),
      q6 as (
      select q4.*, meta_value as branch_code
      from q4
      left join ${table_name} on ${table_name}.coll_id=q4.user_id
      where meta_key='branch_code'
      ),
      q7 as (
      select q6.*, meta_value as pf_number
      from q6
      left join ${table_name} on ${table_name}.coll_id=q6.user_id
      where meta_key='pf_number'
      )
      select * from q7 group by user_id;`;

      knexInstance.raw(rawQuery).then((rows)=>{
        let ack = {
          status_code:"200",
          status:"success",
          message:"User Details get successfully",
          data: rows[0]
        }
        result(null, ack); 
        return;
      })
      .catch((error) => {
        console.error(error);
      })

      return;
  
};

//get nbfc list
Enquire.get_nbfc_list=function(form_data,result){

  const partner_config = require(`../config/all-partners/${global.nbfc}.js`);
  const table_name = `${partner_config.master_database}.common_meta` ;

 

    //global.nbfc
    const rawQuery = ` with a1 as (
      select coll_id as nbfc_id
      from 
        ${table_name}
      where 
      object_id = '${partner_config.partner_id}' and coll_type='partner_nbfc'
      ),
 q1 as (select a1.* from a1 left join ${table_name} on a1.nbfc_id=${table_name}.coll_id),
 q2 as (
      select q1.*, meta_value as mobile
      from q1
      left join ${table_name} on ${table_name}.coll_id=q1.nbfc_id
      where meta_key='mobile'
      ),
q3 as (
      select q2.*, meta_value as product
      from q2
      left join ${table_name} on ${table_name}.coll_id=q2.nbfc_id
      where meta_key='product'
      ),
q4 as (
      select q3.*, meta_value as nbfc_name
      from q3
      left join ${table_name} on ${table_name}.coll_id=q3.nbfc_id
      where meta_key='nbfc_name'
      ),
q6 as (
      select q4.*, meta_value as branch_code
      from q4
      left join ${table_name} on ${table_name}.coll_id=q4.nbfc_id
      where meta_key='branch_code'
      ),
q7 as (
      select q6.*, meta_value as zone
      from q6
      left join ${table_name} on ${table_name}.coll_id=q6.nbfc_id
      where meta_key='zone'
      )
      select * from q7 group by nbfc_id;`;

      knexInstance.raw(rawQuery).then((rows)=>{
        let ack = {
          status_code:"200",
          status:"success",
          message:"NBFC List get successfully",
          data: rows[0]
        }
        result(null, ack); 
        return;
      })
      .catch((error) => {
        console.error(error);
      })

      return; 
};  

//get nbfc details
Enquire.get_nbfc_details=function(form_data,result){

  const partner_config = require(`../config/all-partners/${global.nbfc}.js`);
  const table_name = `${partner_config.master_database}.common_meta` ;

      knexInstance.select()
      .from(`${table_name}`)
      .where('object_id',`${partner_config.partner_id}`)
      .andWhere('coll_id',`${form_data.get_nbfc_details.nbfc_id}`)
      .then((rows)=>{
        let ack = {
          status_code:"200",
          status:"success",
          message:"Nbfc Details get successfullyy",
          data: rows
        }
        result(null, ack); 
        return;
      })
      .catch((error) => {
        console.error(error);
      });   
};

// export data
module.exports = Enquire;