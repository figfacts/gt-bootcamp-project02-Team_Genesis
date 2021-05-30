const router = require('express').Router();
const { User } = require('../config/models');

router.get('/', async (req, res) => {
	try {
		const isAuthenticated = req.isAuthenticated();
		console.log(`************* User authentication: ${isAuthenticated} ***********************`);
		// console.log(`********************* req.session.passport.user= ${req.session.passport.user}`);
		res.render('homePage', { 'isAuthenticated': isAuthenticated });
	} catch(err) {
		console.log(err);
	}
});

module.exports = router;
