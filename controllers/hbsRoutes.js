const router = require('express').Router();
const { User } = require('../config/models');

router.get('/', async (req, res) => {
	try {
		res.render('homePage');
	} catch {
		console.log(err);
	}
});

module.exports = router;
