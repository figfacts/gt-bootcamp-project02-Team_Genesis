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


const categoryRoutes = require('./category/category-routes');
const leagueRoutes = require('./league/league-routes');
const subCategoryRoutes = require('./subcategory/subcategory-routes');
const teamRoutes = require('./team/team-routes');
const userRoutes = require('./user/user-routes');
const userInterestsRoutes = require('./userInterests/userInterests-routes');
const itemRoutes = require('./item/item-routes');

// -----------------------------------------------------------------------------
// Actual Routes
// -----------------------------------------------------------------------------
router.use('/category', categoryRoutes);
router.use('/league', leagueRoutes);
router.use('/subcategory', subCategoryRoutes);
router.use('/team', teamRoutes);
router.use('/user', userRoutes);
router.use('/userInterests', userInterestsRoutes);
router.use('/item', itemRoutes);



// -----------------------------------------------------------------------------
// Module Exports
// -----------------------------------------------------------------------------
module.exports = router;