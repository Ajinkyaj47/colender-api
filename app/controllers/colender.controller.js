// transact controller 
exports.transact = (req,res) => {

  // set global nbfc name to load database configuration
  if(req.headers["partner-id"]){
    global.database=req.headers["partner-id"];
    global.nbfc=req.headers["partner-id"];
  }
   
  // load required modules 
  const Transact = require("../models/transact.model.js");
  const Validate = require("../helpers/validate.js");

  // set headers parameters into data
  let data ={
    "method" : "transact",
    "nbfc":req.headers["partner-id"],
    "product_id":req.headers["req-product-id"],
    "api_auth":req.headers["x-api-auth"]
  }; 

  // check all mandate  fields
  let ack = Validate.mandate_data(data);
  
  // if error then return
  if(ack.status ==="error"){
    res.status(500).send(ack) 
  }
 
/*
  1.get the header config 
  2.validation
  3.check the question and load appropriate templates 
*/

// loop through the data set as a new question and answer model
const partner_config = require(`../config/all-partners/${data.nbfc}.js`);

 for(const key in req.body) {
      /*
          get key from req.body
          check this is allowed to this nbfc else return
      */
  
      if(partner_config.allowed_questions.transact.hasOwnProperty(key)){

       for(const key in req.body) {

        // dyanamic function call
        let functionName = `Transact.${key}`; 
        let response='';
         
        eval(functionName)(req.body,partner_config, (err, data) => {
          console.log(data)
          if (err){
            res.status(500).send({
              message:
                err.message || "Something went wrong"
            });
          }
          else{
            // set response as per question and answer structure
            let req_data = req.body[key];

            if(data.status=='error'){
              response={
                [key]:{
                    question:req_data,
                    error:data
                  }
              }
            }else{ 
            response={
              [key]:{
                  question:req_data,
                  answer:data
                }
            }
          }
            res.send(response);
          }          
        });   
      }      
      }else{
          //make a response as per the question answer model
          res.status(500).send(
            {
              message: "Not Allowed method",
              status_code:"500",
              status:"error"
            }
          )

      }
    }
  return;
};

// enquire controller
exports.enquire = (req,res) => {

  // set global nbfc name to load database configuration
  if(req.headers["partner-id"]){
    global.database=req.headers["partner-id"];
    global.nbfc=req.headers["partner-id"];
  }
   
  // load required modules 
  const Enquire = require("../models/enquire.model.js");
  const Validate = require("../helpers/validate.js");

  // set headers parameters into data
  let data ={
    "method" : "enquire",
    "nbfc":req.headers["partner-id"],
    "product_id":req.headers["req-product-id"],
    "api_auth":req.headers["x-api-auth"]
  }; 

  // check all mandate  fields
  let ack = Validate.mandate_data(data);
  
  // if error then return
  if(ack.status ==="error"){
    res.status(500).send(ack) 
  }
 
/*
  1.get the header config 
  2.validation
  3.check the question and load appropriate templates 
*/

// loop through the data set as a new question and answer model
const partner_config = require(`../config/all-partners/${data.nbfc}.js`);

 for(const key in req.body) {
      /*
          get key from req.body
          check this is allowed to this nbfc else return
      */
  
      if(partner_config.allowed_questions.enquire.hasOwnProperty(key)){

       for(const key in req.body) {

        // dyanamic function call
        let functionName = `Enquire.${key}`; 
         
        eval(functionName)(req.body, (err, data) => {
          if (err){
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving applications."
            });
          }
          else{
            // set response as per question and answer structure
            let req_data = req.body[key];
            let response={
              [key]:{
                  question:req_data,
                  answer:data
                }
            }
            console.log(response);
            res.send(response);
          }          
        });   
      }      
      }else{
          //make a response as per the question answer model
          res.status(500).send(
            {
              message: "Not Allowed method",
              status_code:"500",
              status:"error"
            }
          )

      }
    }
  return;
};
