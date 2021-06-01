// -----------------------------------------------------------------------------
// Route:    category-routes.js
// Purpose:  Routes for Category Table.
// Input:    <none>   
// -----------------------------------------------------------------------------
// Author:   Mark Harrison
// Date:     May 22, 2021
// -----------------------------------------------------------------------------


// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------
const router = require('express').Router();
const { body, validationResult } = require("express-validator");
const { Category } = require('../../../config/models');
// const { sequelize } = require('../../../config/models/Category');
const { 
  getAllCategories,
  getCategoryById, 
  getCategoryByName, 
  createCategory,
  deleteCategory, 
  updateCategory } = require('../../../controllers/category-controller');


// -----------------------------------------------------------------------------
// Get All Categories
// ----------------------------------------------------------------------------- 
router.get('/', async (req, res) => {
  try {
    const categoryData = await getAllCategories();
    if (!categoryData || categoryData.length === 0) res.status(404).json({ message: 'No categories exist.' });
    res.status(200).json(categoryData);
  } catch (err) {
    console.log(`Error: ${err}`);
    res.status(500).json(err)
  }
});


// -----------------------------------------------------------------------------
// Get One Category by id
// ----------------------------------------------------------------------------- 
router.get('/byid/:id', async (req, res) => {
  try {
    const categoryData = await getCategoryById(req.params.id);
    if (!categoryData || categoryData.length === 0) res.status(404).json({ message: `The requested category ${req.params.id} does not exist.` });
    res.status(200).json(categoryData);
  } catch (err) {
    console.log(`Error: ${err}`);
    res.status(500).json(err)
  }
});

// User requested byid, but didn't provide an id - prompt for id
router.get('/byid/', async (req, res) => {
  res.status(400).json({
    message: "Please provide id."
  })
}
);


// -----------------------------------------------------------------------------
// Get One Category by name
// ----------------------------------------------------------------------------- 
router.get('/byname/:name', async (req, res) => {
  try {
    const categoryData = await getCategoryByName(req.params.name);
    if (!categoryData || categoryData.length === 0) res.status(404).json({ message: `The requested category ${req.params.name} does not exist.` });
    res.status(200).json(categoryData);
  } catch (err) {
    console.log(`Error: ${err}`);
    res.status(500).json(err)
  }
})

// User requested name, but didn't provide a name - prompt for name
router.get('/byname/', async (req, res) => {
  res.status(400).json({
    message: "Please provide name."
  })
}
);


// -----------------------------------------------------------------------------
// Render 404 page for any unmatched routes
// -----------------------------------------------------------------------------
router.get("*", function(req, res) {
  res.status(404).json({
    message: "An Invalid Route was Requested."
  })
});


// -----------------------------------------------------------------------------
// Add A Category
// -----------------------------------------------------------------------------
router.post('/', [
  body("name")
    .isLength({ min: 3 })
    .withMessage("The name must have minimum length of 3")
    .trim(),
  ],
  (req, res, next) => {
    const error = validationResult(req).formatWith(({ msg }) => msg);

    const hasError = !error.isEmpty();

    if (hasError) {
      res.status(422).json({ error: error.array() });
    } else {
      next();
    }
  },
  createCategory);


// -----------------------------------------------------------------------------
// Update A Category By its id (primary key)
// -----------------------------------------------------------------------------
router.put('/:id', [
  body("name")
    .isLength({ min: 3 })
    .withMessage("The name must have minimum length of 3")
    .trim(),
  ],
  (req, res, next) => {
    const error = validationResult(req).formatWith(({ msg }) => msg);

    const hasError = !error.isEmpty();

    if (hasError) {
      res.status(422).json({ error: error.array() });
    } else {
      next();
    }
  },
  updateCategory);


// -----------------------------------------------------------------------------
// Delete A Category By its id (primary key)
// -----------------------------------------------------------------------------
router.delete('/:id', async (req, res) => {
  try {
    await deleteCategory(req.params.id);
    const leagueData = await getCategoryById(req, res);

    if (leagueData) {
     res.status(404).json({ message: `Category was not deleted.` });
      return;
   }

    res.status(200).json({ message: `Category was deleted.`});
  } catch (err) {
   console.log(`Error: ${err}`);
   res.status(500).json(err);
  }
});


// -----------------------------------------------------------------------------
// Module Exports
// -----------------------------------------------------------------------------
module.exports = router;