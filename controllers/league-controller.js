// -----------------------------------------------------------------------------
// Route:    league-controller.js
// Purpose:  Routes for League Table.
// Input:    <none>   
// -----------------------------------------------------------------------------
// Author:   Mark Harrison
// Date:     May 22, 2021
// -----------------------------------------------------------------------------


// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------
const { League } = require('../config/models');
const { sequelize } = require('../config/models/League');

// -----------------------------------------------------------------------------
// Get All Leagues
// -----------------------------------------------------------------------------
const getAllLeagues = async () => {
    try {
        const leagueData = await League.findAll({
            order: sequelize.col('league.initials'),
          });
        return leagueData;
    } catch (err) {
        console.log(`Error: ${err}`);
        return null;
    }
}


// -----------------------------------------------------------------------------
// Get A League By its id (primary key)
// -----------------------------------------------------------------------------
const getLeagueById = async (req, res) => {
    try {
        const leagueData = await League.findByPk(req.params.id, {
        });
        return leagueData;
    } catch (err) {
        console.log(`Error: ${err}`);
        return null;
    }
};


// -----------------------------------------------------------------------------
// Get A League By its initials
// -----------------------------------------------------------------------------
const getLeagueByInitials = async (req, res) => {
    try {
        const leagueData = await League.findOne({
          where: { initials: req.params.initials }
        });
        return leagueData;
    } catch (err) {
        console.log(`Error: ${err}`);
        return null;
    }
};


// -----------------------------------------------------------------------------
// Add A League
// -----------------------------------------------------------------------------
const createLeague = async (req, res) => {
    try {
        const leagueData = await League.create(req.body);
        res.status(200).json(leagueData);
    } catch (err) {
        console.log(`Error: ${err}`);
        res.status(500).json(err);
    }
};


// -----------------------------------------------------------------------------
// Update A League By its id (primary key)
// -----------------------------------------------------------------------------
const updateLeague = async (req, res) => {
    try {
        let leagueData = await League.update(req.body, {
                  where: {
                    id: req.params.id,
                  }
                });
                leagueData = await getLeagueById(req, res);
                if (!leagueData) {
                  res.status(404).json({ message: `League ${req.params.id} does not exist.` });
                  return;
                }
            
                res.status(200).json(leagueData);
    } catch (err) {
        console.log(`Error: ${err}`);
        res.status(500).json(err);
    }
};


// -----------------------------------------------------------------------------
// Delete A League By its id (primary key)
// -----------------------------------------------------------------------------
const deleteLeague = async (id) => {
    const leagueData = await League.destroy({
        where: {
            id: id,
        },
    });
};


// -----------------------------------------------------------------------------
// Module Exports
// -----------------------------------------------------------------------------
module.exports = { getAllLeagues,
                   getLeagueById, 
                   getLeagueByInitials, 
                   createLeague, 
                   deleteLeague, 
                   updateLeague };