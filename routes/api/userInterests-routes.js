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
const { UserInterests } = require('../../config/models');


// -----------------------------------------------------------------------------
// Get All User's Interests
// -----------------------------------------------------------------------------
router.get('/', async(req, res) => {
  try {
    const userInterestsData = await UserInterests.findAll({
    });
    if (!userInterestsData) res.status(404).json({ message: 'There are not any interests for any users.' });
    res.status(200).json(userInterestsData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// -----------------------------------------------------------------------------
// Get A User's Interests By its user_id
// -----------------------------------------------------------------------------
router.get('/:user_id', async(req, res) => {
  try {
    const userInterestsData = await UserInterests.findOne({
      where: {user_id: req.params.user_id}
    });
    if (!userInterestsData) res.status(404).json({ message: `There are not any interests for this user:  ${req.params.user_id}.` });
    res.status(200).json(userInterestsData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// -----------------------------------------------------------------------------
// Get A User's Interests By its category_id
// -----------------------------------------------------------------------------
router.get('/:category_id', async(req, res) => {
  try {
    const userInterestsData = await UserInterests.findOne({
      where: {category_id: req.params.category_id}
    });
    if (!userInterestsData) res.status(404).json({ message: `There are not any interests for this category: ${req.params.category_id}.` });
    res.status(200).json(userInterestsData);
  } catch (err) {
    res.status(500).json(err);
  }
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

router.put('/:user_id', async(req, res) => {
  try {
    const userInterestsData = await UserInterests.update(req.body,{
      where: {user_id: req.params.user_id}
    });

    if (!userInterestsData) {
      res.status(404).json({ message: `There are not any interests for this user: ${req.params.user_id}.` });
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
router.delete('/:user_id', async(req, res) => {
  try {
    const userInterestsData = await UserInterests.destroy({
      where: {user_id: req.params.user_id}
    });

    if (!userInterestsData) {
      res.status(404).json({ message: `There are not any interests for this user: ${req.params.user_id}.` });
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