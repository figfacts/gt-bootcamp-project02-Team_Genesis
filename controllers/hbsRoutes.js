const router = require('express').Router();
const { User, Item } = require('../config/models');

// -----------------------------------------------------------------------------
// Get Homepage
// -----------------------------------------------------------------------------
router.get('/', async (req, res) => {
	try {
		const isAuthenticated = req.isAuthenticated();
		res.render('homePage', { 'isAuthenticated': isAuthenticated });
	} catch(err) {
		console.log(err);
	}
});

router.get('/profile', async (req, res) => {
	try {
		const userItems = await Item.findAll({ where: { user_id: req.user.dataValues.id }, raw: true });
		console.log(userItems);
		res.render('profile', { layout: 'profile', userItems });
	} catch(err) {
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


module.exports = router;
