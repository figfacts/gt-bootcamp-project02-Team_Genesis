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
const { Category } = require('../../../config/models');
const { sequelize } = require('../../../config/models/Category');


// -----------------------------------------------------------------------------
// Get All Categories
// ----------------------------------------------------------------------------- 
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      order: sequelize.col('category.name'),
    })
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
    const categoryData = await Category.findByPk(req.params.id);
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
    const categoryData = await Category.findOne({
      where: { name: req.params.name }
    });
    if (!categoryData || categoryData.length === 0) res.status(404).json({ message: `The requested category ${req.params.id} does not exist.` });
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
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create({
      name: req.body.name,
    });
    res.status(200).json(categoryData);
  } catch (err) {
    console.log(`Error: ${err}`);
    res.status(400).json(err);
  }
});


// -----------------------------------------------------------------------------
// Update A Category By its id (primary key)
// -----------------------------------------------------------------------------
router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: `Category ${req.params.id} does not exist.` });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    console.log(`Error: ${err}`);
    res.status(500).json(err);
  }
});


// -----------------------------------------------------------------------------
// Delete A Category By its id (primary key)
// -----------------------------------------------------------------------------
router.delete('/byid/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    console.log(`Error: ${err}`);
    res.status(500).json(err);
  }
});


// -----------------------------------------------------------------------------
// Module Exports
// -----------------------------------------------------------------------------
module.exports = router;