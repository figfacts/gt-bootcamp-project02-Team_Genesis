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
// const { Item, User, SubCategory, Team, Category } = require("../../../config/models");
const { Item, User, SubCategory, Team } = require("../../../config/models");
const { sequelize } = require('../../../config/models/Item');


//-------------------------------------------------------------------------------------------------------
// GET all ITEMS
//-------------------------------------------------------------------------------------------------------
router.get("/", async (req, res) => {
  try {
    const itemData = await Item.findAll({
      order: [sequelize.col('subCategory.description'), 
              sequelize.col('team.name')],
      include: [{ model: User }, 
                { model: SubCategory },
                // { model: Category },
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
      order: [sequelize.col('subCategory.description'), 
              sequelize.col('team.name')],
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
      order: [sequelize.col('team.name')],
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
      order: [sequelize.col('subCategory.description')],
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
    const itemData = await Item.findAll({
      where: { playerSoundex: sequelize.fn('soundex', req.params.playername)},
      order: [sequelize.col('subCategory.description'), 
              sequelize.col('team.name')],
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
    const itemData = await sequelize.query(
      `SELECT * 
      FROM iteminfo 
      WHERE league_initials = "${req.params.leagueinitials}" 
      ORDER BY description, team_name`, 
      {
        model: Item,
        include: [{ model: User }],
        mapToModel: true,
        type: QueryTypes.SELECT
      });
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
    const itemData = await sequelize.query(
      `SELECT * 
      FROM iteminfo 
      WHERE autographed = "${req.params.autograph}" 
      ORDER BY description, team_name`, 
      {
        model: Item,
        include: [{ model: User }],
        mapToModel: true,
        type: QueryTypes.SELECT
      });
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
    const itemData = await sequelize.query(
      `SELECT * 
      FROM iteminfo 
      WHERE team_city = "${req.params.cityname}" 
      ORDER BY description, team_name`, 
      {
        model: Item,
        include: [{ model: User }],
        mapToModel: true,
        type: QueryTypes.SELECT
      });
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
    const itemData = await Item.create(
      req.body
    );
    res.status(200).json(itemData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// -----------------------------------------------------------------------------
// Delete A Item By its id (primary key)
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

//-----------------------------------------------------------------------
router.get('/carouselurls', async (req, res) => {
  
  try {
    const URLs = await sequelize.query("select id, image from item order by id desc limit 5", { type: QueryTypes.SELECT });

    res.status(200).json(URLs);
  } catch (err) {
    res.status(500).json(err);
  }

});


router.get('/homepageitems', async (req, res) => {
  
  try {
    const URLs = await sequelize.query("select id, image, playerName, description from item order by id desc limit 20", { type: QueryTypes.SELECT });

    res.status(200).json(URLs);
  } catch (err) {
    res.status(500).json(err);
  }

});

// -----------------------------------------------------------------------------
// Module Exports
// -----------------------------------------------------------------------------
module.exports = router;
