// -----------------------------------------------------------------------------
// Route:    userInterests-routes.js
// Purpose:  Routes for userinterests Table.
// Input:    <none>   
// -----------------------------------------------------------------------------
// Author:   David Figueroa
// Date:     May 22, 2021
// -----------------------------------------------------------------------------


// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------
const router = require('express').Router();
const { QueryTypes } = require("sequelize");
const { UserInterests, User, Category } = require('../../../config/models');
const { sequelize } = require('../../../config/models/UserInterests');

// -----------------------------------------------------------------------------
// Get All User's Interests
// -----------------------------------------------------------------------------
router.get('/', async(req, res) => {
  try {
    const userInterestsData = await UserInterests.findAll({
      include: [{ model: User }, { model: Category }],
      order: [sequelize.col('user.lastName'), 
              sequelize.col('user.lastName'),
              sequelize.col('category.name')],
    });
    if (!userInterestsData) res.status(404).json({ message: 'There are not any interests for any users.' });
    res.status(200).json(userInterestsData);
  } catch (err) {
    console.log(`Error: ${err}`);
    res.status(500).json(err);
  }
});


// -----------------------------------------------------------------------------
// Get A User's Interests By its user_id
// -----------------------------------------------------------------------------
router.get('/byuserid/:userId', async(req, res) => {
  try {
    const userInterestsData = await UserInterests.findAll({
      where: { user_id: req.params.userId },
      order: [sequelize.col('category.name')],
      include: [{ model: User }, { model: Category }],
    });
    if (!userInterestsData || userInterestsData.length === 0) { res.status(404).json({ message: `There are not any interests for this user:  ${req.params.userId}.` })};
    res.status(200).json(userInterestsData);
  } catch (err) {
    console.log(`Error: ${err}`);
    res.status(500).json(err);
  }
});

// User requested by user id, but didn't provide a user id - prompt for user id
router.get('/byuserid/', async (req, res) => {
  res.status(400).json({
    message: "Please provide user id."
  })
}
);


// -----------------------------------------------------------------------------
// Get A User's Interests By its category_id
// -----------------------------------------------------------------------------
router.get('/bycategoryid/:categoryId', async(req, res) => {
  try {
    const userInterestsData = await UserInterests.findAll({
      where: { category_id: req.params.categoryId },
      order: [sequelize.col('user.lastName'), 
      sequelize.col('user.lastName')],
      include: [{ model: User }, { model: Category }],
    });
    if (!userInterestsData || userInterestsData.length === 0) { res.status(404).json({ message: `There are not any interests for this user:  ${req.params.userId}.` })};
    res.status(200).json(userInterestsData);
  } catch (err) {
    console.log(`Error: ${err}`);
    res.status(500).json(err);
  }
});

// User requested by category id, but didn't provide a category id - prompt for category id
router.get('/byuserid/', async (req, res) => {
  res.status(400).json({
    message: "Please provide category id."
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
// Create (Add) A User's Interest
// -----------------------------------------------------------------------------
router.post('/', async(req, res) => {
  try {
    
    const userInterestsData = await UserInterests.create(req.body);
    res.status(200).json(userInterestsData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// -----------------------------------------------------------------------------
// Update A User's Interest By its user_id
// -----------------------------------------------------------------------------

router.put('/byuser/:userId', async(req, res) => {
  try {
    const userInterestsData = await UserInterests.update(req.body,{
      where: {user_id: req.params.userId}
    });

    if (!userInterestsData) {
      res.status(404).json({ message: `There are not any interests for this user: ${req.params.userId}.` });
      return;
    }

    res.status(200).json(userInterestsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// -----------------------------------------------------------------------------
// Delete a User's Interest By its its user_id
// -----------------------------------------------------------------------------
router.delete('/byuser/:userId', async(req, res) => {
  try {
    const userInterestsData = await UserInterests.destroy({
      where: {user_id: req.params.userId}
    });

    if (!userInterestsData) {
      res.status(404).json({ message: `There are not any interests for this user: ${req.params.userId}.` });
      return;
    }

    res.status(200).json(userInterestsData);
  } catch (err) {
    res.status(500).json(err);
  }
});



// -----------------------------------------------------------------------------
// Module Exports
// -----------------------------------------------------------------------------
module.exports = router;