// -----------------------------------------------------------------------------
// Program:  connection.js
// Purpose:  Create connection to the database.
// Input:    <none>   
// -----------------------------------------------------------------------------
// Author:   Team Genesis
// Date:     May 22, 2021
// -----------------------------------------------------------------------------


// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------
const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;
if (process.env.CLEARDB_DATABASE_URL) {
    console.log(`Connected to ClearDB Database`);
    sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL, { logging: process.env.LOGGING });
}
else {
    console.log(`Connected to Local Database`); 
    sequelize = new Sequelize(process.env.MYSQL_URL);
}


// -----------------------------------------------------------------------------
// Module Exports
// -----------------------------------------------------------------------------
module.exports = sequelize;