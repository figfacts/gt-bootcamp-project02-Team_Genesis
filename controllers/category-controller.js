// -----------------------------------------------------------------------------
// Route:    Category-controller.js
// Purpose:  DB Access for Category Table.
// Input:    <none>   
// -----------------------------------------------------------------------------
// Author:   Mark Harrison
// Date:     May 28, 2021
// -----------------------------------------------------------------------------


// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------
const { Category } = require('../config/models');
const { sequelize } = require('../config/models/Category');


// -----------------------------------------------------------------------------
// Get All Categories
// -----------------------------------------------------------------------------
const getAllCategories = async () => {
    try {
        const categoryData = await Category.findAll({
            order: sequelize.col('category.name'),
          });
        return categoryData;
    } catch (err) {
        console.log(`Error: ${err}`);
        return null;
    }
}


// -----------------------------------------------------------------------------
// Get A Category By its id (primary key)
// -----------------------------------------------------------------------------
const getCategoryById = async (req, res) => {
    try {
        const categoryData = await Category.findByPk(req.params.id, {
        });
        return categoryData;
    } catch (err) {
        console.log(`Error: ${err}`);
        return null;
    }
};


// -----------------------------------------------------------------------------
// Get A Category By its name
// -----------------------------------------------------------------------------
const getCategoryByName = async (req, res) => {
    try {
        const categoryData = await Category.findOne({
          where: { name: req.params.name }
        });
        return categoryData;
    } catch (err) {
        console.log(`Error: ${err}`);
        return null;
    }
};


// -----------------------------------------------------------------------------
// Add A Category
// -----------------------------------------------------------------------------
const createCategory = async (req, res) => {
    try {
        const categoryData = await Category.create(req.body);
        res.status(200).json(categoryData);
    } catch (err) {
        console.log(`Error: ${err}`);
        res.status(500).json(err);
    }
};


// -----------------------------------------------------------------------------
// Update A Category By its id (primary key)
// -----------------------------------------------------------------------------
const updateCategory = async (req, res) => {
    try {
        let categoryData = await Category.update(req.body, {
                  where: {
                    id: req.params.id,
                  }
                });
                categoryData = await getCategoryById(req, res);
                if (!categoryData) {
                  res.status(404).json({ message: `Category ${req.params.id} does not exist.` });
                  return;
                }
            
                res.status(200).json(categoryData);
    } catch (err) {
        console.log(`Error: ${err}`);
        res.status(500).json(err);
    }
};


// -----------------------------------------------------------------------------
// Delete A Category By its id (primary key)
// -----------------------------------------------------------------------------
const deleteCategory = async (id) => {
    const categoryData = await Category.destroy({
        where: {
            id: id,
        },
    });
};


// -----------------------------------------------------------------------------
// Module Exports
// -----------------------------------------------------------------------------
module.exports = { getAllCategories,
                   getCategoryById, 
                   getCategoryByName, 
                   createCategory, 
                   deleteCategory, 
                   updateCategory };