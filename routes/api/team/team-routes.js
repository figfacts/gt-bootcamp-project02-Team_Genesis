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
const { Team, League } = require("../../../config/models");

//-------------------------------------------------------------------------------------------------------
// GET all teams
//-------------------------------------------------------------------------------------------------------
router.get("/", async (req, res) => {
  try {
    const teamData = await Team.findAll({
      include: [{ model: League }],
    });
    if (!teamData) res.status(404).json({ message: "No team exist." });
    res.status(200).json(teamData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//-------------------------------------------------------------------------------------------------------
// GET Teams by (LEAGUE)
//-------------------------------------------------------------------------------------------------------
router.get("/byleague/:league", async (req, res) => {
  try {
    const teamData = await Team.findOne(req.params.League, {
      include: [{ model: League }],
    });
    if (!teamData) {
      res.status(404).json({ message: "No team found!" });
      return;
    }
    res.status(200).json(teamData);
  } catch (err) {
    res.status(500).json(err);
  }
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
    res.status(500).json(err);
  }
});
//-----------------------------------------------------------------------------
// Update A Team
// -----------------------------------------------------------------------------
router.put('/byid/:id', async(req, res) => {
  Team.update(
    {
      city: req.body.id,
      name: req.body.name,
      league_id: req.body.league_id,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedTeam) => {
      res.json(updatedTeam);
    })
    .catch((err) => res.json(err));
});


// -----------------------------------------------------------------------------
// Module Exports
// -----------------------------------------------------------------------------
module.exports = router;
