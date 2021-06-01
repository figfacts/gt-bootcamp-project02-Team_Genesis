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
const { body, validationResult } = require("express-validator");
const {
  getAllLeagues,
  getLeagueById,
  getLeagueByInitials,
  createLeague,
  deleteLeague,
  updateLeague } = require('../../../controllers/league-controller');


// -----------------------------------------------------------------------------
// Get All Leagues
// -----------------------------------------------------------------------------
router.get('/', async (req, res) => {
  try {
    const leagueData = await getAllLeagues();
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
    const leagueData = await getLeagueById(req.params.id);
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
    const leagueData = await getLeagueByInitials(req.params.initials);
    if (!leagueData || leagueData.length === 0) res.status(404).json({ message: `The requested league ${req.params.initials} does not exist.` });
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
router.get("*", function (req, res) {
  res.status(404).json({
    message: "An Invalid Route was Requested."
  })
});


// -----------------------------------------------------------------------------
// Add A League
// -----------------------------------------------------------------------------
router.post('/', [
  body("initials")
    .isLength({ min: 3 })
    .withMessage("The initials must have minimum length of 3")
    .trim(),

  body("name")
    .isLength({ min: 3 })
    .withMessage("The league name must have minimum length of 3")
    .trim(),

  body("leagueLogo")
    .isLength({ min: 5, max: 62 })
    .withMessage("Logo should have min and max length between 5-62")
    .trim(),
],
  (req, res, next) => {
    const error = validationResult(req).formatWith(({ msg }) => msg);

    const hasError = !error.isEmpty();

    if (hasError) {
      res.status(422).json({ error: error.array() });
    } else {
      next();
    }
  },
  createLeague);


// -----------------------------------------------------------------------------
// Update A League By its id (primary key)
// -----------------------------------------------------------------------------
router.put('/:id', [
  body("initials")
    .isLength({ min: 3 })
    .withMessage("The initials must have minimum length of 3")
    .trim(),

  body("name")
    .isLength({ min: 3 })
    .withMessage("The league name must have minimum length of 3")
    .trim(),

  body("leagueLogo")
    .isLength({ min: 5, max: 62 })
    .withMessage("Logo should have min and max length between 5-62")
    .trim(),
],
  (req, res, next) => {
    const error = validationResult(req).formatWith(({ msg }) => msg);

    const hasError = !error.isEmpty();

    if (hasError) {
      res.status(422).json({ error: error.array() });
    } else {
      next();
    }
  },
  updateLeague);


// -----------------------------------------------------------------------------
// Delete A League By its id (primary key)
// -----------------------------------------------------------------------------
router.delete('/:id', async (req, res) => {
  try {
    await deleteLeague(req.params.id);
    const leagueData = await getLeagueById(req.params.id);

    if (leagueData) {
      res.status(404).json({ message: `League was not deleted.` });
      return;
    }

    res.status(200).json({ message: `League was deleted.` });
  } catch (err) {
    console.log(`Error: ${err}`);
    res.status(500).json(err);
  }
});


// -----------------------------------------------------------------------------
// Module Exports
// -----------------------------------------------------------------------------
module.exports = router;