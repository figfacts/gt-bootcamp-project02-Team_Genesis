const router = require('express').Router();
const Category  = require('../../../config/models/Category');
const SubCategory = require('../../../config/models/SubCategory');


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

//get a subcategory by description--------------------------------------------------
router.get('/bydescription/:description', async (req, res) => {

  try {
      const subCategoryData = await SubCategory.findOne({
        where: {description: req.params.description}
      });
      return res.json(subCategoryData);
      
      } catch (err) {
          console.log(err);
          return res.status(500).json(err)
      } 
  
});

//Get one subcategory by its id------------------------------------------------------------




router.get('/byid/:id', async (req, res) => {
    // find one category by its `id` value
    if (!req.params.id) {
      res.status(400).json({
        message: "Please provide id."
      })
    };
    
  try {
      const subCategoryData = await SubCategory.findByPk(req.params.id);
      if (subCategoryData) {
        res.status(200).json(subCategoryData);
      } else {
        res.status(404).json({
          message: "No records found."
        });
      };
      

  } catch (err) {
      console.log(err);
      return res.status(500).json(err)
  }

});


router.get('/byid/', async (req, res) => {
  // find one category by its `id` value
      res.status(400).json({
      message: "Please provide id."
    })
  }
);

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
      res.status(500).json(err);
    }
  });
  
  //update a subcategory by its id -------------------------------------------

  router.put('/byid/:id', async (req, res) => {
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

  //update a subcategory description------------------------------------

  router.put('/bydescription/:description', async (req, res) => {
    try {
      const subCategoryData = await SubCategory.update(req.body, {
        where: {
          id: req.params.description,
        },
      });
      if (!subCategoryData[0]) {
        res.status(404).json({ message: 'No subcategory found' });
        return;
      }
      res.status(200).json(subCategoryData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

    //export out subcategory routes---------------------------------

module.exports = router;
