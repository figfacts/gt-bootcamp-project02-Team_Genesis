// -----------------------------------------------------------------------------
// Program:  team-seeds.js
// Purpose:  Build and populate the team table.
// Input:    <none>   
// -----------------------------------------------------------------------------
// Author:   Mark S Harrison
// Date:     May 19, 2021
// -----------------------------------------------------------------------------


// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------
const { Team } = require('../config/models');  // Object models relate to DB


// -----------------------------------------------------------------------------
// Team Data Values
// -----------------------------------------------------------------------------
const teamData = [
  {
    city:       'Atlanta',
    name:       'Falcons',
    league_id:  1
  },
  {
    city:       'Dallas',
    name:       'Cowboys',
    league_id:  1
  },
  {
    city:       'Green Bay',
    name:       'Packers',
    league_id:  1
  },
  {
    city:       'Chicago',
    name:       'Bears',
    league_id:  1
  },
  {
    city:       'Atlanta',
    name:       'Hawks',
    league_id:  2
  },
  {
    city:       'Los Angeles',
    name:       'Lakers',
    league_id:  2
  },
  {
    city:       'Dallas',
    name:       'Mavericks',
    league_id:  2
  },
  {
    city:       'Atlanta',
    name:       'Dream',
    league_id:  3
  },
  {
    city:       'New York',
    name:       'Liberty',
    league_id:  3
  },
  {
    city:       'Seatle',
    name:       'Storm',
    league_id:  3
  },
  {
    city:       'Atlanta',
    name:       'Braves',
    league_id:  4
  },
  {
    city:       'New York',
    name:       'Yankees',
    league_id:  4
  },
  {
    city:       'New York',
    name:       'Mets',
    league_id:  4
  },
  {
    city:       'Los Angeles',
    name:       'Dodgers',
    league_id:  4
  },
  {
    city:       'WBA',
    name:       'WBA',
    league_id:  5
  },
];


// -----------------------------------------------------------------------------
// Use Sequalize to do multi-insert into table.
// -----------------------------------------------------------------------------
const seedTeams = () => Team.bulkCreate(teamData);


// -----------------------------------------------------------------------------
// Module Exports
// -----------------------------------------------------------------------------
module.exports = teamLeagues;