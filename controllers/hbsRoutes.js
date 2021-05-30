const router = require('express').Router();
const { User } = require('../config/models');

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

// -----------------------------------------------------------------------------
// Logout A User
// -----------------------------------------------------------------------------
router.get('/user/logout', (req, res) => {
	req.logout();
	res.redirect('/');
 });


module.exports = router;
