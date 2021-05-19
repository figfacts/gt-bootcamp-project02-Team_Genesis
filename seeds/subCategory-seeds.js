// -----------------------------------------------------------------------------
// Program:  subCategory-seeds.js
// Purpose:  Build and populate the subCategory table.
// Input:    <none>   
// -----------------------------------------------------------------------------
// Author:   Mark S Harrison
// Date:     May 19, 2021
// -----------------------------------------------------------------------------


// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------
const { SubCategory } = require('../config/models');  // Object models relate to DB


// -----------------------------------------------------------------------------
// SubCategory Data Values
// -----------------------------------------------------------------------------
const subCategoryData = [
  {
    description: 'Jersey',
    category_id: 1
  },
  {
    description: 'Shorts',
    category_id: 1
  },
  {
    description: 'Shoes',
    category_id: 1
  },
  {
    description: 'Helmet',
    category_id: 1
  },
  {
    description: 'Football',
    category_id: 2
  },
  {
    description: 'Basketball',
    category_id: 2
  },
  {
    description: 'Baseball',
    category_id: 2
  },
  {
    description: 'Picture',
    category_id: 3
  },
  {
    description: 'Rookie',
    category_id: 4
  },
  {
    description: 'Player',
    category_id: 4
  }
];


// -----------------------------------------------------------------------------
// Use Sequalize to do multi-insert into table.
// -----------------------------------------------------------------------------
const seedSubCategories = () => User.bulkCreate(subCategoryData);


// -----------------------------------------------------------------------------
// Module Exports
// -----------------------------------------------------------------------------
module.exports = seedSubCategories;