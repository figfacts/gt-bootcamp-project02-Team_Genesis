// -----------------------------------------------------------------------------
// Program:  userInterests-seeds.js
// Purpose:  Build and populate the userInterests table.
// Input:    <none>   
// -----------------------------------------------------------------------------
// Author:   
// Date:     May xx, 2021
// -----------------------------------------------------------------------------


// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------
const { UserInterests } = require('../config/models');  // Object models relate to DB


// -----------------------------------------------------------------------------
// Item Data Values
// -----------------------------------------------------------------------------
const userInterestsData = [
  {
    
  },
  {
    
  }
];


// -----------------------------------------------------------------------------
// Use Sequalize to do multi-insert into table.
// -----------------------------------------------------------------------------
const seedUserInterests = () => UserInterests.bulkCreate(userInterestsData);


// -----------------------------------------------------------------------------
// Module Exports
// -----------------------------------------------------------------------------
module.exports = seedUserIntersts;