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
const { Item } = require("../../../config/models");

//-------------------------------------------------------------------------------------------------------
// GET all ITEMS
//-------------------------------------------------------------------------------------------------------
router.get("/", async (req, res) => {
  try {
    const itemData = await Team.findAll({});
    if (!itemData) res.status(404).json({ message: "No team exist." });
    res.status(200).json(itemData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// -----------------------------------------------------------------------------
// Update A Item By its id (primary key)
// -----------------------------------------------------------------------------
router.put("/byid/:id", async (req, res) => {
  try {
    const userData = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!userData) {
      res
        .status(404)
        .json({ message: `User ${req.params.id} does not exist.` });
      return;
    }

    res.status(200).json(userData);
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
    const itemData = await User.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!itemData) {
      res
        .status(404)
        .json({ message: `User: ${req.params.id} does not exist.` });
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
        .json({ message: `User ${req.params.id} does not exist.` });
      return;
    }

    res.status(200).json(itemData);
  } catch (err) {
    res.status(500).json(err);
  }
});