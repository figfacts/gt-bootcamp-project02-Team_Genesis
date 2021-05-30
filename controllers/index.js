const router = require('express').Router();

const hbsRoutes = require('./hbsRoutes.js');

router.use('/', hbsRoutes);

module.exports = router;
