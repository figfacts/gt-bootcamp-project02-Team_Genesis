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
const { User } = require('../../../config/models');
const { sequelize } = require('../../../config/models/User');
const passport = require('passport');

// -----------------------------------------------------------------------------
// Get All Users
// -----------------------------------------------------------------------------
router.get('/', async(req, res) => {
  try {
    const userData = await User.findAll({
      order: [sequelize.col('user.lastName'), sequelize.col('user.firstName')],
    });
    if (!userData || userData.length === 0) res.status(404).json({ message: 'No users exist.' });
    res.status(200).json(userData);
  } catch (err) {
    console.log(`Error: ${err}`);
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
    if (!userData || userData.length === 0) res.status(404).json({ message: `The requested user ${req.params.id} does not exist.` });
    res.status(200).json(userData);
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
// Get A User By their email
// -----------------------------------------------------------------------------
router.get('/byemail/:email', async(req, res) => {
  try {
    const userData = await User.findOne({
      where: {email: req.params.email},
      order: [sequelize.col('user.lastName'), sequelize.col('user.firstName')],
    });
    if (!userData || userData.length === 0) res.status(404).json({ message: `The requested email: ${req.params.email} does not exist.` });
    res.status(200).json(userData);
  } catch (err) {
    console.log(`Error: ${err}`);
    res.status(500).json(err);
  }
});

// User requested byemail, but didn't provide an email - prompt for email
router.get('/byemail/', async (req, res) => {
  res.status(400).json({
    message: "Please provide email."
  })
}
);


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
    console.log(`Error: ${err}`);
    res.status(500).json(err);
  }
});

// -----------------------------------------------------------------------------
// Login A User
// -----------------------------------------------------------------------------
router.post('/login', async (req, res, next) => {
	try {
		passport.authenticate('local', {
			successRedirect: '/dashboard',
			failureRedirect: '/login',
		})(req, res, next);
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
    console.log(`Error: ${err}`);
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
    console.log(`Error: ${err}`);
    res.status(500).json(err);
  }
});


// -----------------------------------------------------------------------------
// Module Exports
// -----------------------------------------------------------------------------
module.exports = router;