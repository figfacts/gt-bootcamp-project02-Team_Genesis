const router = require('express').Router();
const { User, Item, SubCategory, Team } = require('../config/models');
const passport = require('passport');
const { sequelize } = require('../config/models/Item');

// -----------------------------------------------------------------------------
// Get Homepage
// -----------------------------------------------------------------------------
router.get('/', async (req, res) => {
	try {
		res.render('homePage', { style: 'styles.css', 'isAuthenticated': req.isAuthenticated() });
	} catch (err) {
		console.log(err);
	}
});

router.get('/profile', async (req, res) => {
	try {
		// const userItems = await Item.findAll({ where: { user_id: req.user.dataValues.id }, raw: true });
		const userItems = await Item.findAll({
			where: { user_id: req.user.dataValues.id },
			raw: true,
			order: [ sequelize.col('dateListed'), 
					 sequelize.col('subCategory.description'), 
					 sequelize.col('team.name')],
			include: [{ model: User }, 
			  { model: SubCategory },
			  { model: Team }
			],
		  });
		res.render('profile', { style: 'profile.css', userItems, 'isAuthenticated': req.isAuthenticated() });
	} catch (err) {
		console.log(err);
	}
});

router.get('/addItem', async (req, res) => {
	try {
		res.render('addItem', { style: 'sell.css', 'isAuthenticated': req.isAuthenticated() });
	} catch (err) {
		console.log(err);
	}
});

// -----------------------------------------------------------------------------
// Logout A User
// -----------------------------------------------------------------------------
router.get('/user/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

// -----------------------------------------------------------------------------
// Login A User
// -----------------------------------------------------------------------------
router.post('/login', async (req, res, next) => {
	try {
		await passport.authenticate('local', {
			successRedirect: '/profile',
			failureRedirect: '/',
		})(req, res, next);
	} catch (err) {
		res.status(500).json(err);
	}
});

// -----------------------------------------------------------------------------
// Create (Add) A User
// -----------------------------------------------------------------------------
router.post('/user', async (req, res) => {
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


module.exports = router;
