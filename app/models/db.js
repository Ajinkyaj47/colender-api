const mysql = require("mysql");
const dbConfig = require(`../config/all-partners/${global.nbfc}.js`);
console.log(global.nbfc);
var connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  multipleStatements: true
});

module.exports = connection;
