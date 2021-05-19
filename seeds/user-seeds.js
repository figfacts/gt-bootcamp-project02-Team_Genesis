// -----------------------------------------------------------------------------
// Program:  user-seeds.js
// Purpose:  Build and populate the user table.
// Input:    <none>   
// -----------------------------------------------------------------------------
// Author:   Mark Harrison
// Date:     May 19, 2021
// -----------------------------------------------------------------------------


// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------
const { User } = require('../config/models');  // Object models relate to DB


// -----------------------------------------------------------------------------
// User Data Values
// -----------------------------------------------------------------------------
const userData = [
  {
    firstName:  'Mark',
    lastName:   'Harrison',
    email:      'markh@thorinc.com',
    password:   'password',
    signUpDate: '2021-05-18'
  },
  {
    firstName:  'David',
    lastName:   'Figuroa',
    email:      'david@gmail.com',
    password:   'password',
    signUpDate: '2021-05-18'
  },
  {
    firstName:  'Omari',
    lastName:   'Grampus',
    email:      'omari@gmail.com',
    password:   'password',
    signUpDate: '2021-05-18'
  },
  {
    firstName:  'Asha',
    lastName:   'Sanford',
    email:      'asha@gmail.com',
    password:   'password',
    signUpDate: '2021-05-18'
  },
  {
    firstName:  'Justin',
    lastName:   'Byrd',
    email:      'justin@gmail.com',
    password:   'password',
    signUpDate: '2021-05-18'
  }
];


// -----------------------------------------------------------------------------
// Use Sequalize to do multi-insert into table.
// -----------------------------------------------------------------------------
const seedUsers = () => User.bulkCreate(userData);


// -----------------------------------------------------------------------------
// Module Exports
// -----------------------------------------------------------------------------
module.exports = seedUsers;