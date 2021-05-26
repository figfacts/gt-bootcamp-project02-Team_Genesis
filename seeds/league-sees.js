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
    initials: 'NFL',
    name: 'National Football League',
    leagueLogo: '_NFL_Logo.png'
  },
  {
    initials: 'NBA',
    name: 'National Basketball Association',
    leagueLogo: '_NBA_Logo.svg'
  },
  {
    initials: 'WNBA',
    name: "Women's National Basektball Association",
    leagueLogo: '_WNBA_Logo.png'
  },
  {
    initials: 'MLB',
    name: 'Major League Baseball',
    leagueLogo: '_MLB_Logo.png'
  },
  {
    initials: 'WBA',
    name: 'World Boxing Association',
    leagueLogo: '_WBA_Logo.png'
  },
  {
    initials: 'MHL',
    name: 'National Hockey League',
    leagueLogo: '_NHL_Logo.png'
  }
];

// -----------------------------------------------------------------------------
// Use Sequalize to do multi-insert into table.
// -----------------------------------------------------------------------------
const seedLeagues = () => League.bulkCreate(leagueData);

const indexLeague = League.sequelize.define('League', { /* attributes */ }, {
  indexes: [
    // Create a unique index on initials
    {
      unique: true,
      fields: ['initials']
    },
    // Create a unique index on name
    {
      unique: true,
      fields: ['name']
    }
  ]
});

// -----------------------------------------------------------------------------
// Module Exports
// -----------------------------------------------------------------------------
module.exports = seedLeagues;