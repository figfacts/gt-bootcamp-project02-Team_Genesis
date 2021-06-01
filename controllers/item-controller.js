// -----------------------------------------------------------------------------
// Route:    item-controller.js
// Purpose:  DB access for item Table
// Input:    <none>
// -----------------------------------------------------------------------------
// Author:   Mark Harrison
// Date:     May 31, 2021
// -----------------------------------------------------------------------------


// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------
const { Item, User, SubCategory, Team } = require('../config/models');
const { QueryTypes } = require("sequelize");
const { sequelize } = require('../config/models/Item');


//-------------------------------------------------------------------------------------------------------
// GET all ITEMS
//-------------------------------------------------------------------------------------------------------
const getAllItems = async () => {
  try {
    const itemData = await Item.findAll({
      order: [[sequelize.col('dateListed'), 'DESC'],
      sequelize.col('subCategory.description'),
      sequelize.col('team.name')],
      include: [{ model: User },
      { model: SubCategory },
      { model: Team }
      ],
    });
    return itemData;
  } catch (err) {
    console.log(`Error: ${err}`);
    return null;
  }
};

// -----------------------------------------------------------------------------
// Get A Item By its id (primary key)
// -----------------------------------------------------------------------------
const getItemById = async (itemId) => {
  try {
    const itemData = await Item.findByPk(itemId, {
      include: [{ model: User },
      { model: SubCategory },
      { model: Team }
      ],
    });
    return itemData;
  } catch (err) {
    console.log(`Error: ${err}`);
    return null;
  }
};


//-------------------------------------------------------------------------------------------------------
// GET Items by user id
//-------------------------------------------------------------------------------------------------------
const getItemsByUserId = async (userId) => {
  try {
    const itemData = await Item.findAll({
      where: { user_id: userId },
      order: [[sequelize.col('dateListed'), 'DESC'],
      sequelize.col('subCategory.description'),
      sequelize.col('team.name')],
      include: [{ model: User },
      { model: SubCategory },
      { model: Team }
      ],
    });
    return itemData;
  } catch (err) {
    console.log(`Error: ${err}`);
    return null;
  }
};


//-------------------------------------------------------------------------------------------------------
// GET Items by subCategory id
//-------------------------------------------------------------------------------------------------------
const getItemsBySubCategoryId = async (subCategoryId) => {
  try {
    const itemData = await Item.findAll({
      where: { subCategory_id: subCategoryId },
      order: [[sequelize.col('dateListed'), 'DESC'],
      sequelize.col('subCategory.description'),
      sequelize.col('team.name')],
      include: [{ model: User },
      { model: SubCategory },
      { model: Team }
      ],
    });
    return itemData;
  } catch (err) {
    console.log(`Error: ${err}`);
    return null;
  }
};


//-------------------------------------------------------------------------------------------------------
// GET Items by team id
//-------------------------------------------------------------------------------------------------------
const getItemsByTeamId = async (teamId) => {
  try {
    const itemData = await Item.findAll({
      where: { team_id: teamId },
      order: [[sequelize.col('dateListed'), 'DESC'],
      sequelize.col('subCategory.description'),
      sequelize.col('team.name')],
      include: [{ model: User },
      { model: SubCategory },
      { model: Team }
      ],
    });
    return itemData;
  } catch (err) {
    console.log(`Error: ${err}`);
    return null;
  }
};


//-------------------------------------------------------------------------------------------------------
// GET Items by player name - this will use soundex in case the spelling isn't perfect
//-------------------------------------------------------------------------------------------------------
const getItemsByPlayerName = async (playerName) => {

  try {
    const itemData = await Item.findAll({
      where: { playerSoundex: sequelize.fn('soundex', playerName) },
      order: [[sequelize.col('dateListed'), 'DESC'],
      sequelize.col('subCategory.description'),
      sequelize.col('team.name')],
      include: [{ model: User },
      { model: SubCategory },
      { model: Team }
      ],
    });
    return itemData;
  } catch (err) {
    console.log(`Error: ${err}`);
    return null;
  }
};


//-------------------------------------------------------------------------------------------------------
// GET Items by league initials
//-------------------------------------------------------------------------------------------------------
const getItemsByLeagueInitials = async (leagueInitials) => {
  try {
    const itemData = await sequelize.query(
      `SELECT
         * 
       FROM
         iteminfo 
       WHERE
         league_initials = "${leagueInitials}" 
       ORDER BY
         dateListed DESC,
         description,
         team_name`,
      {
        model: Item,
        include: [{ model: User },
        { model: SubCategory },
        { model: Team }],
        mapToModel: true,
        type: QueryTypes.SELECT
      });
    return itemData;
  } catch (err) {
    console.log(`Error: ${err}`);
    return null;
  }
};


//-------------------------------------------------------------------------------------------------------
// GET Items by autographed
//-------------------------------------------------------------------------------------------------------
const getItemsByAutographed = async (autograph) => {
  try {
    let autographed = false;
    if (autograph == 'true' || autograph == '1') autographed = true;
    const itemData = await Item.findAll({
      where: { autographed: autographed },
      order: [[sequelize.col('dateListed'), 'DESC'],
      sequelize.col('subCategory.description'),
      sequelize.col('team.name')],
      include: [{ model: User },
      { model: SubCategory },
      { model: Team }
      ],
    });
    return itemData;
  } catch (err) {
    console.log(`Error: ${err}`);
    return null;
  }
};


//-------------------------------------------------------------------------------------------------------
// GET Items by city name
//-------------------------------------------------------------------------------------------------------
const getItemsByCityName = async (cityName) => {
  try {
    const itemData = await sequelize.query(
      `SELECT
         * 
       FROM 
         iteminfo 
       WHERE 
         team_city = "${cityName}" 
       ORDER BY
         dateListed DESC, 
         description, 
         team_name`,
      {
        model: Item,
        include: [{ model: User }],
        mapToModel: true,
        type: QueryTypes.SELECT
      });
    return itemData;
  } catch (err) {
    console.log(`Error: ${err}`);
    return null;
  }
};


//-------------------------------------------------------------------------------------------------------
// GET latest items
//-------------------------------------------------------------------------------------------------------
const getLatestItems = async (count) => {
  try {
    const itemData = await sequelize.query(
      `SELECT
         *
       FROM
         itemInfo
       ORDER BY
         dateListed DESC, 
         description, 
         team_name
       LIMIT ${count}`,
      { type: QueryTypes.SELECT });
    return itemData;
  } catch (err) {
    console.log(`Error: ${err}`);
    return null;
  }
};


// -----------------------------------------------------------------------------
// Update An Item By its id (primary key)
// -----------------------------------------------------------------------------
const updateItem = async (req, res) => {
  try {
    itemId = req.params.id;
    let autographed = '0';
    if (req.body.autograph = 'true') autographed = '1';
    const itemData = await sequelize.query(
      `UPDATE 
        item
      SET
        subCategory_id = ${req.body.subCategory_id},
        description = "${req.body.description}",
        autographed = "${autographed}",
        playerName = "${req.body.playerName}",
        playerSoundex = SOUNDEX("${req.body.playerName}"),
        team_id = ${req.body.team_id},
        price = ${req.body.price},
        dateListed = CURRENT_DATE
      WHERE 
        id = ${itemId}`,
      {
        type: QueryTypes.UPDATE
      });
    itemData = await getItemById(itemId);
    if (!leagueData) {
      res.status(404).json({ message: `Item ${itemId} does not exist.` });
      return;
    }

    res.status(200).json(leagueData);
  } catch (err) {
    console.log(`Error: ${err}`);
    res.status(500).json(err);
  }
};


// -----------------------------------------------------------------------------
// Create An Item 
// -----------------------------------------------------------------------------
const createItem = async (req, res) => {
  try {
    let autographed = '0';
    if (req.body.autograph = 'true') autographed = '1';
    let sqlStatement =
      `INSERT INTO 
        item (user_id, subCategory_id, description, autographed, playerName, playerSoundex, team_id, price, dateListed, image)
        values (${req.user.dataValues.id}, ${req.body.subCategory_id}, "${req.body.description}", "${autographed}",
                "${req.body.playerName}", SOUNDEX("${req.body.playerName}"), ${req.body.team_id}, ${req.body.price}, 
                CURRENT_DATE, "${req.body.image}")`;
      sqlStatement = sqlStatement.replace('/n', ' ');
      const itemData = await sequelize.query( sqlStatement,          
      {
        type: QueryTypes.INSERT
      });
    // res.status(200).json({ message: 'Item added' });
    res.redirect('/profile');
  } catch (err) {
    console.log(`Error: ${err}`);
    res.status(500).json(err);
  }
};


// -----------------------------------------------------------------------------
// Delete A Item By its id (primary key)
// -----------------------------------------------------------------------------
const deleteItem = async (id) => {
  const itemData = await Item.destroy({
    where: {
      id: id,
    },
  });
};


// -----------------------------------------------------------------------------
// Module Exports
// -----------------------------------------------------------------------------
module.exports = {
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
  updateItem
};
