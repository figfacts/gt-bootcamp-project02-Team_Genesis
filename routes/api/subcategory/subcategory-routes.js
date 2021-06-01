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
const { body, validationResult } = require("express-validator");
const { 
  getAllSubCategories,
  getSubCategoryById,
  getSubCategoryByDescription,
  getSubCategoryByCategoryId,
  getSubCategoryByCategoryName,
  createSubCategory,
  deleteSubCategory,
  updateSubCategory } = require('../../../controllers/subCategory-controller');

//-------------------------------------------------------------------------------------------------------
// GET all subcategories
//-------------------------------------------------------------------------------------------------------
router.get('/', async (req, res) => {
  try {
    const subCategoryData = await getAllSubCategories();
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
    const subCategoryData = await getSubCategoryById(req.params.id);
    if (!subCategoryData || subCategoryData.length === 0) res.status(404).json({ message: `The requested subCategory ${req.params.id} does not exist.` });
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
//-------------------------------------------------------------------------------------------------------
router.get('/bydescription/:description', async (req, res) => {
  try {
    const subCategoryData = await getSubCategoryByDescription(req.params.description);
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

// User requested description, but didn't provide a description - prompt for description
router.get('/bydescription/', async (req, res) => {
  res.status(400).json({
    message: "Please provide description."
  })
}
);


//-------------------------------------------------------------------------------------------------------
// GET SubCategory by category id
//-------------------------------------------------------------------------------------------------------
router.get("/bycategoryid/:categoryid", async (req, res) => {
  try {
    const subCategoryData = await getSubCategoryByCategoryId(req.params.categoryid);
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
    const subCategoryData = await getSubCategoryByCategoryName(req.params.categoryname);
    if (!subCategoryData || subCategoryData.length == 0) {
      res.status(404).json({ message: "No subCategories found!" });
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
router.post('/', [
  body("description")
    .isLength({ min: 3 })
    .withMessage("The description must have minimum length of 3")
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
  createSubCategory);


//-----------------------------------------------------------------------------
// Delete A SubCategory by id
// -----------------------------------------------------------------------------
router.delete('/byid/:id', async (req, res) => {
  try {
    await deleteSubCategory(req.params.id);
    const subCategoryData = await getSubCategoryById(req.params.id);

    if (subCategoryData) {
     res.status(404).json({ message: `SubCategory was not deleted.` });
      return;
   }

    res.status(200).json({ message: `SubCategory was deleted.`});
  } catch (err) {
   console.log(`Error: ${err}`);
   res.status(500).json(err);
  }
});


//-----------------------------------------------------------------------------
// Update A SubCategory
// -----------------------------------------------------------------------------
router.put('/:id', [
  body("description")
    .isLength({ min: 3 })
    .withMessage("The description must have minimum length of 3")
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
  updateSubCategory);


// -----------------------------------------------------------------------------
// Module Exports
// -----------------------------------------------------------------------------
module.exports = router;
