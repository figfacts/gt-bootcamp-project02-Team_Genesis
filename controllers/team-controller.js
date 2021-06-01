// -----------------------------------------------------------------------------
// Route:    Team-controller.js
// Purpose:  DB Access for Team Table.
// Input:    <none>   
// -----------------------------------------------------------------------------
// Author:   Mark Harrison
// Date:     May 30, 2021
// -----------------------------------------------------------------------------


// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------
const { Team, League } = require('../config/models');
const { sequelize } = require('../config/models/Team');
const { QueryTypes } = require("sequelize");


// -----------------------------------------------------------------------------
// Get All Teams
// -----------------------------------------------------------------------------
const getAllTeams = async () => {
    try {
        const teamData = await Team.findAll({
            order: sequelize.col('team.name'),
          });
        return teamData;
    } catch (err) {
        console.log(`Error: ${err}`);
        return null;
    }
}


// -----------------------------------------------------------------------------
// Get A Team By its id (primary key)
// -----------------------------------------------------------------------------
const getTeamById = async (teamId) => {
    try {
        const teamData = await Team.findByPk(teamId, {
        });
        return teamData;
    } catch (err) {
        console.log(`Error: ${err}`);
        return null;
    }
};


// -----------------------------------------------------------------------------
// Get Teams By City
// -----------------------------------------------------------------------------
const getTeamsByCity = async (cityName) => {
    try {
        const teamData = await Team.findAll({
            where: { city: cityName },
            order: [sequelize.col('team.city'), sequelize.col('team.name')],
            include: [{ model: League }],
          });
        return teamData;
    } catch (err) {
        console.log(`Error: ${err}`);
        return null;
    }
};


// -----------------------------------------------------------------------------
// Get Teams By Name
// -----------------------------------------------------------------------------
const getTeamsByName = async (name) => {
    try {
        const teamData = await Team.findAll({
            where: { name: name },
            order: [sequelize.col('team.name')],
            include: [{ model: League }],
          });
        return teamData;
    } catch (err) {
        console.log(`Error: ${err}`);
        return null;
    }
};


// -----------------------------------------------------------------------------
// Get Teams by League ID
// -----------------------------------------------------------------------------
const getTeamsByLeagueId = async (req, res) => {
    try {
        const teamData = await Team.findAll({
            where: { league_id: req.params.leagueid },
            order: [sequelize.col('team.city'), sequelize.col('team.name')],
            include: [{ model: League }],
          });
        return teamData;
    } catch (err) {
        console.log(`Error: ${err}`);
        return null;
    }
};


// -----------------------------------------------------------------------------
// Get Teams by League Initials
// -----------------------------------------------------------------------------
const getTeamsByLeagueInitials = async (req, res) => {
    try {
      const teamData = await sequelize.query(
        `SELECT 
           * 
         FROM 
           teaminfo 
         WHERE 
           league_initials = "${req.params.leagueinitials}" 
        ORDER BY 
          city, 
          name`,
        {
          // model: Team,
          // mapToModel: true,
          // include: [{ model: League }],
          type: QueryTypes.SELECT
        });
        return teamData;
    } catch (err) {
        console.log(`Error: ${err}`);
        return null;
    }
};


// -----------------------------------------------------------------------------
// Add A Team
// -----------------------------------------------------------------------------
const createTeam = async (req, res) => {
    try {
        const teamData = await Team.create(req.body);
        res.status(200).json(teamData);
    } catch (err) {
        console.log(`Error: ${err}`);
        res.status(500).json(err);
    }
};


// -----------------------------------------------------------------------------
// Update A Team By its id (primary key)
// -----------------------------------------------------------------------------
const updateTeam = async (req, res) => {
    try {
        let teamData = await Team.update(req.body, {
                  where: {
                    id: req.params.id,
                  }
                });
                teamData = await getTeamById(req, res);
                if (!teamData) {
                  res.status(404).json({ message: `Team ${req.params.id} does not exist.` });
                  return;
                }
            
                res.status(200).json(teamData);
    } catch (err) {
        console.log(`Error: ${err}`);
        res.status(500).json(err);
    }
};


// -----------------------------------------------------------------------------
// Delete A Team By its id (primary key)
// -----------------------------------------------------------------------------
const deleteTeam = async (id) => {
    const teamData = await Team.destroy({
        where: {
            id: id,
        },
    });
};


// -----------------------------------------------------------------------------
// Module Exports
// -----------------------------------------------------------------------------
module.exports = { getAllTeams,
                   getTeamById,
                   getTeamsByCity, 
                   getTeamsByName,
                   getTeamsByLeagueId,
                   getTeamsByLeagueInitials,
                   createTeam, 
                   deleteTeam, 
                   updateTeam };