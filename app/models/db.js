const mysql = require("mysql");
const dbConfig = require(`../config/all-partners/${global.database}.js`);
console.log(global.database);
var connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  multipleStatements: true
});

module.exports = connection;
