// -----------------------------------------------------------------------------
// Route:    item-routes.js
// Purpose:  Routes for item Table.
// Input:    <none>
// -----------------------------------------------------------------------------
// Author:   Mark Harrison
// Date:     May 31, 2021
// -----------------------------------------------------------------------------


// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------
const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const {
  getAllItems,
  getItemById,
  getItemsByUserId,
  getItemsBySubCategoryId,
  getItemsByTeamId,
  getItemsByPlayerName,
  getItemsByLeagueInitials,
  getItemsByAutographed,
  getItemsByCityName,
  getLatestItems,
  createItem,
  deleteItem,
  updateItem } = require('../../../controllers/item-controller');



//-------------------------------------------------------------------------------------------------------
// GET all ITEMS
//-------------------------------------------------------------------------------------------------------
router.get("/", async (req, res) => {
  try {
    const itemData = await getAllItems();
    if (!itemData || itemData.length === 0) res.status(404).json({ message: "No items exist." });
    res.status(200).json(itemData);
  } catch (err) {
    console.log(`Error: ${err}`);
    res.status(500).json(err);
  }
});

// -----------------------------------------------------------------------------
// Get A Item By its id (primary key)
// -----------------------------------------------------------------------------
router.get('/byid/:id', async (req, res) => {
  try {
    const itemData = await getItemById(req.params.id);
    if (!itemData) res.status(404).json({ message: `The requested item ${req.params.id} does not exist.` });
    res.status(200).json(itemData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// User requested by id, but didn't provide an id - prompt for id
router.get('/byid/', async (req, res) => {
  res.status(400).json({
    message: "Please provide id."
  })
}
);


//-------------------------------------------------------------------------------------------------------
// GET Items by user id
//-------------------------------------------------------------------------------------------------------
router.get("/byuserid/:userid", async (req, res) => {
  try {
    const itemData = await getItemsByUserId(req.params.userid);
    if (!itemData || itemData.length === 0) {
      res.status(404).json({ message: "No items found!" });
      return;
    }
    res.status(200).json(itemData);
  } catch (err) {
    console.log(`Error: ${err}`);
    res.status(500).json(err);
  }
});

// User requested by userid, but didn't provide a userid - prompt for userid
router.get('/byuserid/', async (req, res) => {
  res.status(400).json({
    message: "Please provide user id."
  })
}
);


//-------------------------------------------------------------------------------------------------------
// GET Items by subCategory id
//-------------------------------------------------------------------------------------------------------
router.get("/bysubcategoryid/:subcategoryid", async (req, res) => {
  try {
    const itemData = await getItemsBySubCategoryId(req.params.subcategoryid);
    if (!itemData || itemData.length === 0) {
      res.status(404).json({ message: "No items found!" });
      return;
    }
    res.status(200).json(itemData);
  } catch (err) {
    console.log(`Error: ${err}`);
    res.status(500).json(err);
  }
});

// User requested by subcategoryid, but didn't provide an id - prompt for id
router.get('/bysubcategory/', async (req, res) => {
  res.status(400).json({
    message: "Please provide subCategory id."
  })
}
);


//-------------------------------------------------------------------------------------------------------
// GET Items by team id
//-------------------------------------------------------------------------------------------------------
router.get("/byteamid/:teamid", async (req, res) => {
  try {
    const itemData = await getItemsByTeamId(req.params.teamid);
    if (!itemData || itemData.length === 0) {
      res.status(404).json({ message: "No items found!" });
      return;
    }
    res.status(200).json(itemData);
  } catch (err) {
    console.log(`Error: ${err}`);
    res.status(500).json(err);
  }
});

// User requested by teamid, but didn't provide an id - prompt for id
router.get('/byteamid/', async (req, res) => {
  res.status(400).json({
    message: "Please provide team id."
  })
}
);


//-------------------------------------------------------------------------------------------------------
// GET Items by player name - this will use soundex in case the spelling isn't perfect
//-------------------------------------------------------------------------------------------------------
router.get("/byplayername/:playername", async (req, res) => {
  try {
    const itemData = await getItemsByPlayerName(req.params.playername);
    if (!itemData || itemData.length === 0) {
      res.status(404).json({ message: "No items found!" });
      return;
    }
    res.status(200).json(itemData);
  } catch (err) {
    console.log(`Error: ${err}`);
    res.status(500).json(err);
  }
});

// User requested by Player Name, but didn't provide a name - prompt for name
router.get('/byplayername/', async (req, res) => {
  res.status(400).json({
    message: "Please provide player name."
  })
}
);


//-------------------------------------------------------------------------------------------------------
// GET Items by league initials
//-------------------------------------------------------------------------------------------------------
router.get("/byleagueinitials/:leagueinitials", async (req, res) => {
  try {
    const itemData = await getItemsByLeagueInitials(req.params.leagueinitials);
    if (!itemData || itemData.length == 0) {
      res.status(404).json({ message: "No items found!" });
      return;
    }
    res.status(200).json(itemData);
  } catch (err) {
    console.log(`Error: ${err}`);
    res.status(500).json(err);
  }
});


//-------------------------------------------------------------------------------------------------------
// GET Items by autographed
//-------------------------------------------------------------------------------------------------------
router.get("/byautographed/:autograph", async (req, res) => {
  try {
    const itemData = await getItemsByAutographed(req.params.autograph);
    if (!itemData || itemData.length == 0) {
      res.status(404).json({ message: "No items found!" });
      return;
    }
    res.status(200).json(itemData);
  } catch (err) {
    console.log(`Error: ${err}`);
    res.status(500).json(err);
  }
});

// User requested by autogrpahed, but didn't provide boolean - prompt for boolean
router.get('/byautographed/', async (req, res) => {
  res.status(400).json({
    message: "Please provide autographed boolean (1/0)."
  })
}
);


//-------------------------------------------------------------------------------------------------------
// GET Items by city name
//-------------------------------------------------------------------------------------------------------
router.get("/bycity/:cityname", async (req, res) => {
  try {
    const itemData = await getItemsByCityName(req.params.cityname);
    if (!itemData || itemData.length == 0) {
      res.status(404).json({ message: "No items found!" });
      return;
    }
    res.status(200).json(itemData);
  } catch (err) {
    console.log(`Error: ${err}`);
    res.status(500).json(err);
  }
});

// User requested by city, but didn't provide city - prompt for city
router.get('/bycity/', async (req, res) => {
  res.status(400).json({
    message: "Please provide city."
  })
}
);

//-------------------------------------------------------------------------------------------------------
// GET latest items
//-------------------------------------------------------------------------------------------------------
router.get('/latestitems/:count', async (req, res) => {
  try {
    const itemData = await getLatestItems(req.params.count);
    if (!itemData || itemData.length == 0) {
      res.status(404).json({ message: "No items found!" });
      return;
    }
    res.status(200).json(itemData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// -----------------------------------------------------------------------------
// Update An Item By its id (primary key)
// -----------------------------------------------------------------------------
router.put('/:id', [
  body("description")
    .isLength({ min: 3 })
    .withMessage("The description must have minimum length of 3")
    .trim(),

  body("autographed")
    .isIn([true, false])
    .withMessage("Must Provied Autographed")
    .trim(),

  body("playerName")
    .isLength({ min: 5, max: 62 })
    .withMessage("Player name must have minimum length of 3")
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
  updateItem);


// -----------------------------------------------------------------------------
// Create An Item 
// -----------------------------------------------------------------------------
router.post('/', [
  body("description")
    .isLength({ min: 3 })
    .withMessage("The description must have minimum length of 3")
    .trim(),

  body("autographed")
    .isIn([true, false])
    .withMessage("Must Provied Autographed")
    .trim(),

  body("playerName")
    .isLength({ min: 5, max: 62 })
    .withMessage("Player name must have minimum length of 3")
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
  createItem);


// -----------------------------------------------------------------------------
// Delete A Item By its id (primary key)
// -----------------------------------------------------------------------------
router.delete("/byid/:id", async (req, res) => {
  try {
    await deleteItem(req.params.id);
    const itemData = await getItemById(req, res);

    if (itemData) {
      res.status(404).json({ message: `League was not deleted.` });
      return;
    }

    res.status(200).json(itemData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// -----------------------------------------------------------------------------
// Module Exports
// -----------------------------------------------------------------------------
module.exports = router;
