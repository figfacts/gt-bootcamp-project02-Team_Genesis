// -----------------------------------------------------------------------------
// Route:    index.js
// Purpose:  Routes application.
// Input:    <none>   
// -----------------------------------------------------------------------------
// Author:   Mark Harrison
// Date:     May 22, 2021
// -----------------------------------------------------------------------------


// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------
const router = require('express').Router();


const categoryRoutes = require('./category-routes');
const leagueRoutes = require('./league-routes');
const subCategoryRoutes = require('./subCategory-routes');
const teamRoutes = require('./team-routes');
const userRoutes = require('./user-routes');
const userInterestsRoutes = require('./userInterests-routes');


// -----------------------------------------------------------------------------
// Actual Routes
// -----------------------------------------------------------------------------
router.use('/category', categoryRoutes);
router.use('/league', leagueRoutes);
router.use('/subCategory', subCategoryRoutes);
router.use('/team', teamRoutes);
router.use('/user', userRoutes);
router.use('/userInterests', userInterestsRoutes);
router.use('/category', categoryRoutes);
router.use('/subcategory', subcategoryRoutes);


// -----------------------------------------------------------------------------
// Module Exports
// -----------------------------------------------------------------------------
module.exports = router;