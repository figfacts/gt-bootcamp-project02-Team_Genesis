// -----------------------------------------------------------------------------
// Route:    subategory-routes.js
// Purpose:  Routes for SubCategory Table.
// Input:    <none>   
// -----------------------------------------------------------------------------
// Author:   Mark Harrison
// Date:     May 22, 2021
// -----------------------------------------------------------------------------


// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------
const router = require('express').Router();
const { QueryTypes } = require("sequelize");
const { SubCategory, Category } = require('../../../config/models');
const { sequelize } = require('../../../config/models/SubCategory');


//-------------------------------------------------------------------------------------------------------
// GET all teams
//-------------------------------------------------------------------------------------------------------
router.get('/', async (req, res) => {
  try {
    const subCategoryData = await SubCategory.findAll({
      order: [sequelize.col('subcategory.description')],
      include: [{ model: Category }],
    });
    if (!subCategoryData || subCategoryData.length === 0) res.status(404).json({ message: "No subCategories exist." });
    res.status(200).json(subCategoryData);
  } catch (err) {
    console.log(`Error: ${err}`);
    res.status(500).json(err)
  }
});


//-------------------------------------------------------------------------------------------------------
// GET SubCategories by id
//-------------------------------------------------------------------------------------------------------
router.get("/byid/:id", async (req, res) => {
  try {
    const subCategoryData = await SubCategory.findByPk(req.params.id, {
      include: [{ model: Category }],
    });
    if (!subCategoryData || subCategoryData.length === 0) res.status(404).json({ message: `The requested team ${req.params.id} does not exist.` });
    res.status(200).json(subCategoryData);
  } catch (err) {
    console.log(`Error: ${err}`);
    res.status(500).json(err);
  }
});

// User requested byid, but didn't provide an id - prompt for id
router.get('/byid/', async (req, res) => {
  res.status(400).json({
    message: "Please provide id."
  })
}
);


//-------------------------------------------------------------------------------------------------------
// GET SubCategories by description
//-------------------------------------------------------------------------------------------------------router.get('/byid/', async (req, res) => {
router.get('/bydescription/:description', async (req, res) => {
  try {
    const subCategoryData = await SubCategory.findOne({
      where: { description: req.params.description }
    });
    if (!subCategoryData || subCategoryData.length === 0) {
      res.status(404).json({ message: "No subCategories found!" });
      return;
    }
    res.status(200).json(subCategoryData);
  } catch (err) {
    console.log(`Error: ${err}`);
    res.status(500).json(err)
  }
});


//-------------------------------------------------------------------------------------------------------
// GET SubCategory by category id
//-------------------------------------------------------------------------------------------------------
router.get("/bycategoryid/:categoryid", async (req, res) => {
  try {
    const subCategoryData = await SubCategory.findAll({
      where: {category_id: req.params.categoryid},
      order: [sequelize.col('subcategory.description')],
      include: [{ model: Category }],
    });
    if (!subCategoryData || subCategoryData.length === 0) {
      res.status(404).json({ message: "No subCategories found!" });
      return;
    }
    res.status(200).json(subCategoryData);
  } catch (err) {
    console.log(`Error: ${err}`);
    res.status(500).json(err);
  }
});

// User requested by category id, but didn't provide a category id - prompt for category id
router.get('/bycategoryid/', async (req, res) => {
  res.status(400).json({
    message: "Please provide category id."
  })
}
);


//-------------------------------------------------------------------------------------------------------
// GET SubCategory by category name
//-------------------------------------------------------------------------------------------------------
router.get("/bycategoryname/:categoryname", async (req, res) => {
  try {
    const subCategoryData = await sequelize.query(
      `SELECT * 
      FROM subcategoryinfo 
      WHERE category_name = "${req.params.categoryname}" 
      ORDER BY description`, 
      {
        model: SubCategory,
        include: [{ model: Category }],
        mapToModel: true,
        type: QueryTypes.SELECT
      });
    // const subCategoryData = await SubCategory.findAll({
    //   where: { ['category.name']: req.params.categoryname },
    //   order: [sequelize.col('subcategory.description')],
    //   include: [{ model: Category }],
    // });
    if (!subCategoryData || subCategoryData.length == 0) {
      res.status(404).json({ message: "No subCategory found!" });
      return;
    }
    res.status(200).json(subCategoryData);
  } catch (err) {
    console.log(`Error: ${err}`);
    res.status(500).json(err);
  }
});

// User requested by category name, but didn't provide a name - prompt for name
router.get('/bycategoryname/', async (req, res) => {
  res.status(400).json({
    message: "Please provide category name."
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
// Create (Add) A Team
// -----------------------------------------------------------------------------
router.post('/', async (req, res) => {
  try {
    const subCategoryData = await SubCategory.create({
      name: req.body.name,
    });
    res.status(200).json(subCategoryData);
  } catch (err) {
    console.log(`Error: ${err}`);
    res.status(400).json(err);
  }
});


//-----------------------------------------------------------------------------
// Delete A SubCategory by id
// -----------------------------------------------------------------------------
router.delete('/byid/:id', async (req, res) => {
  try {
    const subCategoryData = await SubCategory.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!subCategoryData) {
      res.status(404).json({ message: 'No subcategory found with this id' });
      return;
    }

    res.status(200).json(subCategoryData);
  } catch (err) {
    console.log(`Error: ${err}`);
    res.status(500).json(err);
  }
});


//-----------------------------------------------------------------------------
// Update A SubCategory
// -----------------------------------------------------------------------------
router.put('/byid/:id', async (req, res) => {
  try {
    const subCategoryData = await SubCategory.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!subCategoryData[0]) {
      res.status(404).json({ message: 'No subcategory found' });
      return;
    }
    res.status(200).json(subCategoryData);
  } catch (err) {
    console.log(`Error: ${err}`);
    res.status(500).json(err);
  }
});


// -----------------------------------------------------------------------------
// Module Exports
// -----------------------------------------------------------------------------
module.exports = router;
