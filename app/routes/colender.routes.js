module.exports = app => {
  const colender = require("../controllers/colender.controller.js");

  var router = require("express").Router();

 // transact
 router.post('/transact',colender.transact)

 
 // enquire
 router.post('/enquire',colender.enquire)

 app.use('/api/', router);
 
};
   
