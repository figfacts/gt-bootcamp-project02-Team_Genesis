const Sequelize = require('sequelize');
require('dotenv').config();

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: '@localhost',
//     dialect: 'mysql',
//     port: 3306,
//   }
// );
//Note: to use CLEARDB_DATABASE_URL you will need to enter the credentials in your .env file
// const sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL)

//Note: to use MYSQL_URL you will need to enter your credentials in your .env file
const sequelize = new Sequelize(process.env.MYSQL_URL)

module.exports = sequelize;