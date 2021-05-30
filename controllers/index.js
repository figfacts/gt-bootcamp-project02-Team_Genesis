const router = require('express').Router();

const hbsRoutes = require('./hbsRoutes.js');

router.use('/hbs', hbsRoutes);

module.exports = router;
