
// load knex 
const knex = require('knex');

// load database settings 
const db_config = require('./db_config');

// initiate knex instance 
const knexInstance=knex(db_config.development);

// Function to insert data into a table
async function create(table, data) {
  return await knexInstance(table).insert(data);
}

// Function to update data in a table based on a condition
async function update(table, condition, data) {
  return await knexInstance(table).where(condition).update(data);
}

// Function to delete data from a table based on a condition
async function del(table, condition) {
  return await knexInstance(table).where(condition).del();
}

// Function to fetch data from a table based on a condition
async function fetch(table, condition) {
  return await knexInstance(table).where(condition);
}

module.exports = { create, update, del, fetch };