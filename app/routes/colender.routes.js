module.exports = app => {
  const colender = require("../controllers/colender.controller.js");

  var router = require("express").Router();

   // transact
 router.post('/transact',colender.transact)

 app.use('/api/', router);
 
};
  /*
  // Retrieve all Tutorials
  router.get("/", colender.findAll);

  //get incomplete loan meta
 router.get("/incomplete-loan-meta", colender.get_incomplete_loan_meta);

 //get dashboard count
 router.get("/get-dashboard-count", colender.get_dashboard_count);

 */


  /*
  // Create a new Tutorial
  router.post("/", colender.create);


  // Retrieve all published Tutorials
  router.get("/published", colender.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", colender.findOne);

  // Update a Tutorial with id
  router.put("/:id", colender.update);

  // Delete a Tutorial with id
  router.delete("/:id", colender.delete);

  // Delete all Tutorials
  router.delete("/", colender.deleteAll);
*/
  
