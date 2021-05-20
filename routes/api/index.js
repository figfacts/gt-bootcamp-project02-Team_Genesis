const router = require('express').Router();
const userRoutes = require('./userRoutes');
const userInterestsRoutes = require('./userInterestsRoutes');

router.use('/user', userRoutes);
router.use('/userInterests', userInterestsRoutes);


module.exports = router;