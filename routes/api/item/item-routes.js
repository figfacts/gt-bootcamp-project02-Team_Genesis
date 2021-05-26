// -----------------------------------------------------------------------------
// Route:    itemRoutes.js
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
const { Item, User, SubCategory, Team } = require("../../../config/models");
const { sequelize } = require('../../../config/models/Item');


//-------------------------------------------------------------------------------------------------------
// GET all ITEMS
//-------------------------------------------------------------------------------------------------------
router.get("/", async (req, res) => {
  try {
    const itemData = await Item.findAll({
      order: [sequelize.col('subCategory.description'), sequelize.col('team.name')],
      include: [{ model: User }, 
                { model: SubCategory },
                { model: Team }
              ],
    });
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
router.get('/byid/:id', async(req, res) => {
  try {
    const itemData = await Item.findByPk(req.params.id, {
      include: [{ model: User }, 
                { model: SubCategory },
                { model: Team }
              ],
    });
    if (!itemData) res.status(404).json({ message: `The requested item ${req.params.id} does not exist.` });
    res.status(200).json(itemData);
  } catch (err) {
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
// GET Items by user id
//-------------------------------------------------------------------------------------------------------
router.get("/byuserid/:userid", async (req, res) => {
  try {
    const itemData = await Item.findAll({
      where: { user_id: req.params.userid },
      order: [sequelize.col('subCategory.description'), sequelize.col('team.name')],
      include: [{ model: User }, 
        { model: SubCategory },
        { model: Team }
      ],
    });
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

// User requested byuserid, but didn't provide a userid - prompt for userid
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
    const itemData = await Item.findAll({
      where: { subCategory_id: req.params.subcategoryid },
      order: [sequelize.col('subCategory.description'), sequelize.col('team.name')],
      include: [{ model: User }, 
                { model: SubCategory },
                { model: Team }
               ],
    });
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

// User requested bysubcategoryid, but didn't provide an id - prompt for id
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
    const itemData = await Item.findAll({
      where: { team_id: req.params.teamid },
      order: [sequelize.col('subCategory.description'), sequelize.col('team.name')],
      include: [{ model: User }, 
                { model: SubCategory },
                { model: Team }
               ],
    });
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

// User requested byteamid, but didn't provide an id - prompt for id
router.get('/bysubcategory/', async (req, res) => {
  res.status(400).json({
    message: "Please provide team id."
  })
}
);


// -----------------------------------------------------------------------------
// Update A Item By its id (primary key)
// -----------------------------------------------------------------------------
router.put("/byid/:id", async (req, res) => {
  try {
    const itemData = await Item.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!itemData) {
      res
        .status(404)
        .json({ message: `User ${req.params.id} does not exist.` });
      return;
    }

    res.status(200).json(itemData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Create a new ITEM
router.post("/", async (req, res) => {
  try {
    const itemData = await Item.create({
      reader_id: req.body.reader_id,
    });
    res.status(200).json(itemData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// -----------------------------------------------------------------------------
// Delete A User By its id (primary key)
// -----------------------------------------------------------------------------
router.delete("/byid/:id", async (req, res) => {
  try {
    const itemData = await Item.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!itemData) {
      res
        .status(404)
        .json({ message: `Item: ${req.params.id} does not exist.` });
      return;
    }

    res.status(200).json(itemData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// -----------------------------------------------------------------------------
// Update A User By its id (primary key)
// -----------------------------------------------------------------------------
router.put("/byid/:id", async (req, res) => {
  try {
    const itemData = await Item.update(
      {
        description: req.body.description,
        autographed: req.body.autographed,
        price: req.body.price,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!itemData) {
      res
        .status(404)
        .json({ message: `Item ${req.params.id} does not exist.` });
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
