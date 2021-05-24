  
require('dotenv').config();

const Sequelize = require('sequelize');

//Note: to use CLEARDB_DATABASE_URL you will need to enter the credentials in your .env file
// const sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL)

//Note: to use MYSQL_URL you will need to enter your credentials in your .env file
const sequelize = new Sequelize(process.env.MYSQL_URL)

module.exports = sequelize;