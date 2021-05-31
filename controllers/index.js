const router = require('express').Router();

const apiRoutes = require('../routes/api');
const hbsRoutes = require('./hbsRoutes.js');

router.use('/api', apiRoutes);
router.use('/', hbsRoutes);

module.exports = router;
