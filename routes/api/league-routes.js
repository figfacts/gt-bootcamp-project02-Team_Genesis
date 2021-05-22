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
const { League } = require('../../config/models/League');


// -----------------------------------------------------------------------------
// Get All Leagues
// -----------------------------------------------------------------------------
router.get('/', async(req, res) => {
  try {
    const leagueData = await User.findAll({
    });
    if (!leagueData) res.status(404).json({ message: 'No leagues exist.' });
    res.status(200).json(leagueData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// -----------------------------------------------------------------------------
// Get A League By its id (primary key)
// -----------------------------------------------------------------------------
router.get('/:id', async(req, res) => {
  try {
    const leagueData = await League.findByPk(req.params.id, {
    });
    if (!leagueData) res.status(404).json({ message: `The requested league ${req.params.id} does not exist.` });
    res.status(200).json(leagueData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// -----------------------------------------------------------------------------
// Get A League By its initials
// -----------------------------------------------------------------------------
router.get('/:initials', async(req, res) => {
  try {
    const leagueData = await League.findOne({
      where: {initials: req.params.initials}
    });
    if (!leagueData) res.status(404).json({ message: `The requested league ${req.params.id} does not exist.` });
    res.status(200).json(leagueData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// -----------------------------------------------------------------------------
// Add A League
// -----------------------------------------------------------------------------
router.post('/', async(req, res) => {
  try {
	const leagueData = await League.create(req.body);
	res.status(200).json(leagueData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// -----------------------------------------------------------------------------
// Update A League By its id (primary key)
// -----------------------------------------------------------------------------
router.put('/:id', async(req, res) => {
  try {
    const leagueData = await League.update(req.body,{
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
    res.status(500).json(err);
  }
});


// -----------------------------------------------------------------------------
// Delete A League By its id (primary key)
// -----------------------------------------------------------------------------
router.delete('/:id', async(req, res) => {
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
    res.status(500).json(err);
  }
});


// -----------------------------------------------------------------------------
// Module Exports
// -----------------------------------------------------------------------------
module.exports = router;