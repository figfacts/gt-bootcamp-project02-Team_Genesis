const router = require('express').Router();
const Category  = require('../../config/models/Category');
const SubCategory = require('../../config/models/SubCategory');


//Get all subcategories---------------------------------------------------

router.get('/', async (req, res) => {

    try {
        const subCategoryData = await SubCategory.findAll();
        return res.json(subCategoryData);
        
        } catch (err) {
            console.log(err);
            return res.status(500).json(err)
        } 
    
});

router.get('byintials/:initials', async (req, res) => {

  try {
      const subCategoryData = await SubCategory.findOne({
        where: {intials: req.params.initials}
      });
      return res.json(subCategoryData);
      
      } catch (err) {
          console.log(err);
          return res.status(500).json(err)
      } 
  
});

//Get one subcategory by its id------------------------------------------------------------

router.get('/:id', async (req, res) => {
    // find one category by its `id` value
  // be sure to include its associated Products
  try {
      const subCategoryData = await SubCategory.findByPk(req.params.id);
      return res.json(subCategoryData);
  } catch (err) {
      console.log(err);
      return res.status(500).json(err)
  }

});

//create and add a new subcategory-----------------------------------------------------

router.post('/', async (req, res) => {
    try {
      const subCategoryData = await SubCategory.create({
        name: req.body.name,
      });
      res.status(200).json(subCategoryData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  //delete a subcategory by it's id---------------------------------------------------------------------

  router.delete('/:id', async (req, res) => {
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
      res.status(500).json(err);
    }
  });
  
  //update a subcategory by its id -------------------------------------------

  router.put('/:id', async (req, res) => {
    try {
      const subCategoryData = await SubCategory.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      if (!subCategoryData[0]) {
        res.status(404).json({ message: 'No subcategory found with this id' });
        return;
      }
      res.status(200).json(subCategoryData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

    //export out category routes---------------------------------

module.exports = router;
