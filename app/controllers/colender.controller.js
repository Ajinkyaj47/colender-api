const Colender = require("../models/colender.model.js");
const Validate = require("../helpers/validate.js");

// transact controller
exports.transact = (req,res) => {

  //set headers parameters into data
  let data ={
    "method" : "transact",
    "nbfc":req.headers["partner-id"],
    "product_id":req.headers["req-product-id"],
    "api_auth":req.headers["x-api-auth"]
  };
  
  // set global nbfc name to load database configuration
  global.nbfc=data.nbfc;    

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
console.log(partner_config)

 for(const key in req.body) {
      /*
          get key from req.body
          check this is allowed to this nbfc else return
      */
  
      if(partner_config.allowed_questions.hasOwnProperty(key)){

       for(const key in req.body) {

        // dyanamic function call

        let functionName = `Colender.${key}`; 
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

/*

// Create a application
  const colender = new Colender({
    //title: req.body.title,
    //description: req.body.description,
    //published: req.body.published || false
  });


// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
  const status = req.query.status;
  
  Colender.getAll(status, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving applications."
      });
    else res.send(data);
  });
};

//get incomplete applications for disbursement
exports.get_incomplete_loan_meta = (req,res) => {
  Colender.get_incomplete_loan_meta((err,data)=>{
    if(err)
      res.status(500).send({
        message:
          err.message || "Some error is occurred while getting incomplete data."
      });
      else res.send(data);
  });
};

// get dashboard count
exports.get_dashboard_count = (req,res) => {
  Colender.get_dashboard_count((err,data)=>{
      if(err){
        res.status(500).send(
          {
            message:
            err.message || "Some error is occurred"
          }
        )
      }else{
        res.status(200).send(data)
      }
  });
};

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
}
  // Save Colender in the database
  Colender.create(colender, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    else res.send(data);
  });
};



// Find a single Tutorial by Id
exports.findOne = (req, res) => {
  Colender.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tutorial with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Tutorial with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published Tutorials
exports.findAllPublished = (req, res) => {
  Colender.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  });
};

// Update a Tutorial identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Colender.updateById(
    req.params.id,
    new Colender(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Tutorial with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Tutorial with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  Colender.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tutorial with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Tutorial with id " + req.params.id
        });
      }
    } else res.send({ message: `Tutorial was deleted successfully!` });
  });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Colender.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    else res.send({ message: `All Tutorials were deleted successfully!` });
  });
};
*/