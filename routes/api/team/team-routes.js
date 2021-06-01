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
const { body, validationResult } = require("express-validator");
const { getAllTeams,
  getTeamById, 
  getTeamsByCity,
  getTeamsByName,
  getTeamsByLeagueId,
  getTeamsByLeagueInitials,
  createTeam,
  deleteTeam, 
  updateTeam } = require('../../../controllers/team-controller');

//-------------------------------------------------------------------------------------------------------
// GET all teams
//-------------------------------------------------------------------------------------------------------
router.get("/", async (req, res) => {
  try {
    const teamData = await getAllTeams(req, res);
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
    const teamData = await getTeamById(req, res);
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
// GET Teams by City
//-------------------------------------------------------------------------------------------------------
router.get("/bycity/:city", async (req, res) => {
  try {
    const teamData = await getTeamsByCity(req, res);
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
// GET Teams by Name
//-------------------------------------------------------------------------------------------------------
router.get("/byname/:name", async (req, res) => {
  try {
    const teamData = await getTeamsByName(req, res);
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
// GET Teams by league id
//-------------------------------------------------------------------------------------------------------
router.get("/byleagueid/:leagueid", async (req, res) => {
  try {
    const teamData = await getTeamsByLeagueId(req, res);
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
// GET Teams by league initials
//-------------------------------------------------------------------------------------------------------
router.get("/byleagueinitials/:leagueinitials", async (req, res) => {
  try {
    const teamData = await getTeamsByLeagueInitials(req, res);
    if (!teamData || teamData.length == 0) {
      res.status(404).json({ message: "No teams found!" });
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
router.post('/', [
  body("city")
    .isLength({ min: 2 })
    .withMessage("The city name must have minimum length of 3")
    .trim(),

  body("name")
    .isLength({ min: 3 })
    .withMessage("The team name must have minimum length of 3")
    .trim(),

  body("teamLogo")
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
  createTeam);


//-----------------------------------------------------------------------------
// Delete A Team by id
// -----------------------------------------------------------------------------
router.delete('/:id', async (req, res) => {
  try {
    await deleteTeam(req.params.id);
    const teamData = await getTeamById(req, res);

    if (teamData) {
     res.status(404).json({ message: `Team was not deleted.` });
      return;
   }

    res.status(200).json({ message: `Team was deleted.`});
  } catch (err) {
   console.log(`Error: ${err}`);
   res.status(500).json(err);
  }
});


//-----------------------------------------------------------------------------
// Update A Team
// -----------------------------------------------------------------------------
router.put('/byid/:id', [
  body("city")
    .isLength({ min: 2 })
    .withMessage("The city name must have minimum length of 3")
    .trim(),

  body("name")
    .isLength({ min: 3 })
    .withMessage("The team name must have minimum length of 3")
    .trim(),

  body("teamLogo")
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
  updateTeam);


// -----------------------------------------------------------------------------
// Module Exports
// -----------------------------------------------------------------------------
module.exports = router;
