// -----------------------------------------------------------------------------
// Route:    teamRoutes.js
// Purpose:  Routes for user Table.
// Input:    <none>
// -----------------------------------------------------------------------------
// Author:   Omari Grampus
// Date:     May 22, 2021
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------
const router = require("express").Router();
const { QueryTypes } = require("sequelize");
const { Team, League } = require("../../../config/models");
const { sequelize } = require('../../../config/models/Team');


//-------------------------------------------------------------------------------------------------------
// GET all teams
//-------------------------------------------------------------------------------------------------------
router.get("/", async (req, res) => {
  try {
    const teamData = await Team.findAll({
      order: [sequelize.col('team.city'), sequelize.col('team.name')],
      include: [{ model: League }],
    });
    if (!teamData || teamData.length === 0) res.status(404).json({ message: "No teams exist." });
    res.status(200).json(teamData);
  } catch (err) {
    console.log(`Error: ${err}`);
    res.status(500).json(err);
  }
});


//-------------------------------------------------------------------------------------------------------
// GET Teams by id
//-------------------------------------------------------------------------------------------------------
router.get("/byid/:id", async (req, res) => {
  try {
    const teamData = await Team.findByPk(req.params.id, {
      include: [{ model: League }],
    });
    if (!teamData || teamData.length === 0) res.status(404).json({ message: `The requested team ${req.params.id} does not exist.` });
    res.status(200).json(leagueData);
  } catch (err) {
    console.log(`Error: ${err}`);
    res.status(500).json(err);
  }
});

// User requested byid, but didn't provide an id - prompt for id
router.get('/byid/', async (req, res) => {
  res.status(400).json({
    message: "Please provide id."
  })
}
);


//-------------------------------------------------------------------------------------------------------
// GET Teams by league id
//-------------------------------------------------------------------------------------------------------
router.get("/byleagueid/:leagueid", async (req, res) => {
  try {
    const teamData = await Team.findAll({
      where: { league_id: req.params.leagueid },
      order: [sequelize.col('team.city'), sequelize.col('team.name')],
      include: [{ model: League }],
    });
    if (!teamData || teamData.length === 0) {
      res.status(404).json({ message: "No teams found!" });
      return;
    }
    res.status(200).json(teamData);
  } catch (err) {
    console.log(`Error: ${err}`);
    res.status(500).json(err);
  }
});

// User requested by league id, but didn't provide a league id - prompt for league id
router.get('/byleagueid/', async (req, res) => {
  res.status(400).json({
    message: "Please provide league id."
  })
}
);


//-------------------------------------------------------------------------------------------------------
// GET Teams by city
//-------------------------------------------------------------------------------------------------------
router.get("/bycity/:city", async (req, res) => {
  try {
    const teamData = await Team.findAll({
      where: { city: req.params.city },
      order: [sequelize.col('team.city'), sequelize.col('team.name')],
      include: [{ model: League }],
    });
    if (!teamData || teamData.length === 0) {
      res.status(404).json({ message: "No teams found!" });
      return;
    }
    res.status(200).json(teamData);
  } catch (err) {
    console.log(`Error: ${err}`);
    res.status(500).json(err);
  }
});

// User requested by city, but didn't provide a city - prompt for city
router.get('/bycity/', async (req, res) => {
  res.status(400).json({
    message: "Please provide city."
  })
}
);


//-------------------------------------------------------------------------------------------------------
// GET Teams by league initials
//-------------------------------------------------------------------------------------------------------
// router.get("/byleagueinitials/:leagueinitials", async (req, res) => {
//   try {
//     const teamData = await Team.findAll({
//       where: {'league.initials': req.params.leagueinitials},
//       order: [sequelize.col('team.city'), sequelize.col('team.name')],
//       include: [{ model: League }],
//     });
//     console.log(`Number of teams: ${teamData.length}`);
//     if (!teamData || teamData.length == 0) {
//       res.status(404).json({ message: "No team found!" });
//       return;
//     }
//     res.status(200).json(teamData);
//   } catch (err) {
//     console.log(`Error: ${err}`);
//     res.status(500).json(err);
//   }
// });

router.get("/byleagueinitials/:leagueinitials", async (req, res) => {
  try {
    const teamData = await sequelize.query(
      `SELECT * FROM teaminfo WHERE league_initials = "${req.params.leagueinitials}" 
      ORDER BY city, name`,
      {
        // model: Team,
        // mapToModel: true,
        // include: [{ model: League }],
        type: QueryTypes.SELECT
      });
    if (!teamData || teamData.length == 0) {
      res.status(404).json({ message: "No team found!" });
      return;
    }
    res.status(200).json(teamData);
  } catch (err) {
    console.log(`Error: ${err}`);
    res.status(500).json(err);
  }
});

// User requested by league initials, but didn't provide a initials - prompt for initials
router.get('/byleagueinitials/', async (req, res) => {
  res.status(400).json({
    message: "Please provide league initials."
  })
}
);


// -----------------------------------------------------------------------------
// Render 404 page for any unmatched routes
// -----------------------------------------------------------------------------
router.get("*", function (req, res) {
  res.status(404).json({
    message: "An Invalid Route was Requested."
  })
});


// -----------------------------------------------------------------------------
// Create (Add) A Team
// -----------------------------------------------------------------------------
router.post("/", async (req, res) => {
  try {
    const teamData = await Team.create({
      reader_id: req.body.reader_id,
    });
    res.status(200).json(teamData);
  } catch (err) {
    console.log(`Error: ${err}`);
    res.status(400).json(err);
  }
});


//-----------------------------------------------------------------------------
// Delete A Team by id
// -----------------------------------------------------------------------------
router.delete("/byid/:id", async (req, res) => {
  try {
    const teamData = await Team.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!teamData) {
      res.status(404).json({ message: "No Team found with that id!" });
      return;
    }
    res.status(200).json(teamData);
  } catch (err) {
    console.log(`Error: ${err}`);
    res.status(500).json(err);
  }
});


//-----------------------------------------------------------------------------
// Update A Team
// -----------------------------------------------------------------------------
router.put('/byid/:id', async (req, res) => {
  try {
    const teamData = await Team.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!teamData[0]) {
      res.status(404).json({ message: 'No team found' });
      return;
    }
    res.status(200).json(teamData);
  } catch (err) {
    console.log(`Error: ${err}`);
    res.status(500).json(err);
  }
});


// -----------------------------------------------------------------------------
// Module Exports
// -----------------------------------------------------------------------------
module.exports = router;