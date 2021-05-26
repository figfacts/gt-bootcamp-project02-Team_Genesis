// -----------------------------------------------------------------------------
// Route:    league-routes.js
// Purpose:  Routes for League Table.
// Input:    <none>   
// -----------------------------------------------------------------------------
// Author:   Mark Harrison
// Date:     May 22, 2021
// -----------------------------------------------------------------------------


// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------
const router = require('express').Router();
const { League } = require('../../../config/models');
const { sequelize } = require('../../../config/models/League');


// -----------------------------------------------------------------------------
// Get All Leagues
// -----------------------------------------------------------------------------
router.get('/', async (req, res) => {
  try {
    const leagueData = await League.findAll({
      order: sequelize.col('league.initials'),
    });
    if (!leagueData || leagueData.length === 0) res.status(404).json({ message: 'No leagues exist.' });
    res.status(200).json(leagueData);
  } catch (err) {
    console.log(`Error: ${err}`);
    res.status(500).json(err);
  }
});


// -----------------------------------------------------------------------------
// Get A League By its id (primary key)
// -----------------------------------------------------------------------------
router.get('/byId/:id', async (req, res) => {
  try {
    const leagueData = await League.findByPk(req.params.id, {
    });
    if (!leagueData || leagueData.length === 0) res.status(404).json({ message: `The requested league ${req.params.id} does not exist.` });
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


// -----------------------------------------------------------------------------
// Get A League By its initials
// -----------------------------------------------------------------------------
router.get('/byinitials/:initials', async (req, res) => {
  try {
    const leagueData = await League.findOne({
      where: { initials: req.params.initials }
    });
    if (!leagueData || leagueData.length === 0) res.status(404).json({ message: `The requested league ${req.params.id} does not exist.` });
    res.status(200).json(leagueData);
  } catch (err) {
    console.log(`Error: ${err}`);
    res.status(500).json(err);
  }
});

// User requested initials, but didn't provide initials - prompt for initials
router.get('/byinitials/', async (req, res) => {
  res.status(400).json({
    message: "Please provide initials."
  })
});


// -----------------------------------------------------------------------------
// Render 404 page for any unmatched routes
// -----------------------------------------------------------------------------
router.get("*", function(req, res) {
  res.status(404).json({
    message: "An Invalid Route was Requested."
  })
});


// -----------------------------------------------------------------------------
// Add A League
// -----------------------------------------------------------------------------
router.post('/', async (req, res) => {
  try {
    const leagueData = await League.create(req.body);
    res.status(200).json(leagueData);
  } catch (err) {
    console.log(`Error: ${err}`);
    res.status(500).json(err);
  }
});


// -----------------------------------------------------------------------------
// Update A League By its id (primary key)
// -----------------------------------------------------------------------------
router.put('/:id', async (req, res) => {
  try {
    const leagueData = await League.update(req.body, {
      where: {
        id: req.params.id,
      }
    });

    if (!leagueData) {
      res.status(404).json({ message: `League ${req.params.id} does not exist.` });
      return;
    }

    res.status(200).json(leagueData);
  } catch (err) {
    console.log(`Error: ${err}`);
    res.status(500).json(err);
  }
});


// -----------------------------------------------------------------------------
// Delete A League By its id (primary key)
// -----------------------------------------------------------------------------
router.delete('/:id', async (req, res) => {
  try {
    const leagueData = await League.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!leagueData) {
      res.status(404).json({ message: `League: ${req.params.id} does not exist.` });
      return;
    }

    res.status(200).json(leagueData);
  } catch (err) {
    console.log(`Error: ${err}`);
    res.status(500).json(err);
  }
});


// -----------------------------------------------------------------------------
// Module Exports
// -----------------------------------------------------------------------------
module.exports = router;