
const dbConfig = require(`../config/all-partners/${global.database}.js`); 

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: dbConfig.HOST,
      user: dbConfig.USER,
      password: dbConfig.PASSWORD,
      database: dbConfig.DB,
      multipleStatements: true
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};


/* const mysql = require("mysql");
const knex = require('knex');

const dbConfig = require(`../config/all-partners/${global.database}.js`);

var mysqlconnection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  multipleStatements: true
});

// Create a Knex instance
const connection = knex({
  client: 'mysql',
  connection: mysqlconnection,
});

module.exports = connection;
 */