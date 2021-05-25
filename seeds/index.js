// -----------------------------------------------------------------------------
// Program:  index.js
// Purpose:  Build and populate the tables.
// Input:    <none>   
// -----------------------------------------------------------------------------
// Author:   Mark Harrison
// Date:     May 19, 2021
// -----------------------------------------------------------------------------


// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------
const seedCategories = require('./category-seeds');
const seedItems = require('./item-seeds');
const seedLeagues = require('./league-sees');
const seedSubCategories = require('./subCategory-seeds');
const seedTeams = require('./team-seeds');
const seedUsers = require('./user-seeds');
const seedUserInterests = require('./userInterests-seeds');

const sequelize = require('../config/connection');


// -----------------------------------------------------------------------------
// Function: seedAll
// Purpose:  Call JavaScript Modules to Build/Seed the database tables.
// Input:    <none> 
// Returns:  <none>  
// -----------------------------------------------------------------------------
const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await seedLeagues();
  console.log('\n----- LEAGUES SEEDED -----\n');

  await seedTeams();
  console.log('\n----- TEAMS SEEDED -----\n');

  await seedCategories();
  console.log('\n----- CATEGORIES SEEDED -----\n');

  await seedSubCategories();
  console.log('\n----- SUBCATEGORIES SEEDED -----\n');

  await seedUsers();
  console.log('\n----- USERS SEEDED -----\n');
  
  await seedUserInterests();
  console.log('\n----- USER INTERESTS SEEDED -----\n');
  
  await seedItems();
  console.log('\n----- ITEMS SEEDED -----\n');

  process.exit(0);  // Force Normal Exit
};


// -----------------------------------------------------------------------------
// On Load, call seedAll function - create tables & load initial values
// -----------------------------------------------------------------------------
seedAll();
