const router = require('express').Router();
const userRoutes = require('./user-routes');
const userInterestsRoutes = require('./userInterests-routes');

router.use('/user', userRoutes);
router.use('/userInterests', userInterestsRoutes);


module.exports = router;