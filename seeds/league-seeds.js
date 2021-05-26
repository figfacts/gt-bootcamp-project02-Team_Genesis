// -----------------------------------------------------------------------------
// Program:  league-seeds.js
// Purpose:  Build and populate the league table.
// Input:    <none>   
// -----------------------------------------------------------------------------
// Author:   Mark S Harrison
// Date:     May 19, 2021
// -----------------------------------------------------------------------------


// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------
const { League } = require('../config/models');  // Object models relate to DB


// -----------------------------------------------------------------------------
// League Data Values
// -----------------------------------------------------------------------------
const leagueData = [
  {
    initials:   'NFL',
    name:       'National Football League',
    leagueLogo: 'NFL.png'
  },
  {
    initials:   'NBA',
    name:       'National Basketball Association',
    leagueLogo: 'NBA.svg'
  },
  {
    initials:   'WNBA',
    name:       "Women's National Basektball Association",
    leagueLogo: 'WNBA.png'
  },
  {
    initials:   'MLB',
    name:       'Major League Baseball',
    leagueLogo: 'MLB.png'
  },
  {
    initials:   'WBA',
    name:       'World Boxing Association',
    leagueLogo: 'WBA.png'
  }
];


// -----------------------------------------------------------------------------
// Use Sequelize to do multi-insert into table.
// -----------------------------------------------------------------------------
const seedLeagues = () => League.bulkCreate(leagueData);


// -----------------------------------------------------------------------------
// Module Exports
// -----------------------------------------------------------------------------
module.exports = seedLeagues;