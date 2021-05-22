const router = require('express').Router();
const userRoutes = require('./userRoutes');
const userInterestsRoutes = require('./userInterestsRoutes');
const categoryRoutes = require('./category-routes');
const subcategoryRoutes = require('./subcategory-routes')

router.use('/user', userRoutes);
router.use('/userInterests', userInterestsRoutes);
router.use('/category', categoryRoutes);
router.use('/subcategory', subcategoryRoutes);


module.exports = router;