// -----------------------------------------------------------------------------
// Route:    subategory-controller.js
// Purpose:  DB Access for SubCategory Table.
// Input:    <none>   
// -----------------------------------------------------------------------------
// Author:   Mark Harrison
// Date:     May 31, 2021
// -----------------------------------------------------------------------------


// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------
const { SubCategory, Category } = require('../config/models');
const { sequelize } = require('../config/models/SubCategory');


//-------------------------------------------------------------------------------------------------------
// GET all teams
//-------------------------------------------------------------------------------------------------------
const getAllSubCategories = async () => {
  try {
    const subCategoryData = await SubCategory.findAll({
      order: [sequelize.col('subcategory.description')],
      include: [{ model: Category }],
    });
    return subCategoryData;
} catch (err) {
    console.log(`Error: ${err}`);
    return null;
}
}


//-------------------------------------------------------------------------------------------------------
// GET SubCategories by id
//-------------------------------------------------------------------------------------------------------
const getSubCategoryById = async (id) => {
  try {
    const subCategoryData = await SubCategory.findByPk(id, {
    });
    return subCategoryData;
  } catch (err) {
    console.log(`Error: ${err}`);
    return null;
  }
};


//-------------------------------------------------------------------------------------------------------
// GET SubCategories by description
//-------------------------------------------------------------------------------------------------------
const getSubCategoryByDescription = async (description) => {
  try {
    const subCategoryData = await SubCategory.findOne({
      where: { description: description }
    });
    return subCategoryData;
  } catch (err) {
    console.log(`Error: ${err}`);
    return null;
  }
};


//-------------------------------------------------------------------------------------------------------
// GET SubCategory by category id
//-------------------------------------------------------------------------------------------------------
const getSubCategoryByCategoryId = async (categoryId) => {
  try {
    const subCategoryData = await SubCategory.findAll({
      where: { category_id: categoryId },
      order: [sequelize.col('subcategory.description')],
      include: [{ model: Category }],
    });
    return subCategoryData;
  } catch (err) {
    console.log(`Error: ${err}`);
    return null;
  }
};


//-------------------------------------------------------------------------------------------------------
// GET SubCategory by category name
//-------------------------------------------------------------------------------------------------------
const getSubCategoryByCategoryName = async (categoryName) => {
  try {
    const subCategoryData = await sequelize.query(
      `SELECT
         * 
       FROM
         subcategoryinfo 
       WHERE
         category_name = "${categoryName}" 
       ORDER BY
         description`,
      {
        model: SubCategory,
        include: [{ model: Category }],
        mapToModel: true,
        type: QueryTypes.SELECT
      });
    return subCategoryData;
  } catch (err) {
    console.log(`Error: ${err}`);
    return null;
  }
};


// -----------------------------------------------------------------------------
// Create (Add) A SubCategory
// -----------------------------------------------------------------------------
const createSubCategory = async (req, res) => {
  try {
    const subCategoryData = await SubCategory.create({
      name: req.body.name,
    });
    res.status(200).json(subCategoryData);
  } catch (err) {
    console.log(`Error: ${err}`);
    res.status(400).json(err);
  }
};


//-----------------------------------------------------------------------------
// Delete A SubCategory by id
// -----------------------------------------------------------------------------
const deleteSubCategory = async (id) => {
  const subCategoryData = await SubCategory.destroy({
    where: {
      id: id,
    },
  });
};


//-----------------------------------------------------------------------------
// Update A SubCategory
// -----------------------------------------------------------------------------
const updateSubCategory = async (req, res) => {
  try {
    const subCategoryId = req.params.id;
    const subCategoryData = await SubCategory.update(req.body, {
      where: {
        id: subCategoryId,
      },
    });
    subCategoryData = await getSubCategoryById(subCategoryId);
    if (!subCategoryData) {
      res.status(404).json({ message: `SubCategory ${subCategoryId} does not exist.` });
      return;
    }

    res.status(200).json(subCategoryData);
  } catch (err) {
    console.log(`Error: ${err}`);
    res.status(500).json(err);
  }
};

// -----------------------------------------------------------------------------
// Module Exports
// -----------------------------------------------------------------------------
module.exports = {
  getAllSubCategories,
  getSubCategoryById,
  getSubCategoryByDescription,
  getSubCategoryByCategoryId,
  getSubCategoryByCategoryName,
  createSubCategory,
  deleteSubCategory,
  updateSubCategory
};
