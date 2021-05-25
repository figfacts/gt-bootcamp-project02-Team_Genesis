// -----------------------------------------------------------------------------
// Route:    user-routes.js
// Purpose:  Routes for user Table.
// Input:    <none>   
// -----------------------------------------------------------------------------
// Author:   David Figueroa
// Date:     May 22, 2021
// -----------------------------------------------------------------------------


// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------
const router = require('express').Router();
// const bcrypt = require('bcrypt'); Justin B. See line 69 & 70
const { User } = require('../../../config/models/User');

// -----------------------------------------------------------------------------
// Get All Users
// -----------------------------------------------------------------------------
router.get('/', async(req, res) => {
  try {
    const userData = await User.findAll({
    });
    if (!userData) res.status(404).json({ message: 'No users exist.' });
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// -----------------------------------------------------------------------------
// Get A User By its id (primary key)
// -----------------------------------------------------------------------------
router.get('/byid/:id', async(req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
    });
    if (!userData) res.status(404).json({ message: `The requested user ${req.params.id} does not exist.` });
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// -----------------------------------------------------------------------------
// Get A User By their email
// -----------------------------------------------------------------------------
router.get('/byemail/:email', async(req, res) => {
  try {
    const userData = await User.findOne({
      where: {email: req.params.email}
    });
    if (!userData) res.status(404).json({ message: `The requested email: ${req.params.email} does not exist.` });
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// -----------------------------------------------------------------------------
// Create (Add) A User
// -----------------------------------------------------------------------------
router.post('/', async(req, res) => {
  try {
  //hashing password should be a hook on your model | Justin B. to Update 
	// req.body.password = await bcrypt.hash(req.body.password, 10);
	const userData = await User.create(req.body);
	res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// -----------------------------------------------------------------------------
// Update A User By its id (primary key)
// -----------------------------------------------------------------------------
router.put('/byid/:id', async(req, res) => {
  try {
    const userData = await User.update(req.body,{
      where: {
        id: req.params.id,
      }
    });

    if (!userData) {
      res.status(404).json({ message: `User ${req.params.id} does not exist.` });
      return;
    }

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// -----------------------------------------------------------------------------
// Delete A User By its id (primary key)
// -----------------------------------------------------------------------------
router.delete('/byid/:id', async(req, res) => {
  try {
    const userData = await User.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!userData) {
      res.status(404).json({ message: `User: ${req.params.id} does not exist.` });
      return;
    }

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// -----------------------------------------------------------------------------
// Module Exports
// -----------------------------------------------------------------------------
module.exports = router;