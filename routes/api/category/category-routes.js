const Category = require('../../../config/models/Category');
const { render } = require('../../../server');

const router = require('express').Router();


// get all categories----------------------------------------------------
  
router.get('/', async (req, res) => {
 try {
        const categoryData =  await Category.findAll();
        return res.json(categoryData);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    }

});

//get one category by it's id---------------------------------------------------------------

router.get('byid/:id', async (req, res) => {
    // find one category by its `id` value
  // be sure to include its associated Products
  try {
      const categoryData = await Category.findByPk(req.params.id);
      return res.json(categoryData);
  } catch (err) {
      console.log(err);
      return res.status(500).json(err)
  }

});

//get one category by it's name-----------------------------------------------

router.get('byname/:name', async (req, res) => {
  // find one category by its `id` value
// be sure to include its associated Products
try {
    const categoryData = await Category.findOne(req.params.name);
    return res.json(categoryData);
} catch (err) {
    console.log(err);
    return res.status(500).json(err)
}

})


//create and add a new category--------------------------------------------------------------------------------------

router.post('/', async (req, res) => {
    try {
      const categoryData = await Category.create({
        name: req.body.name,
      });
      res.status(200).json(categoryData);
    } catch (err) {
      res.status(400).json(err);
    }
  });


  //delete a category by it's id---------------------------------------------------------------------

  router.delete('byid/:id', async (req, res) => {
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
      res.status(500).json(err);
    }
  });
  

  //update a category by its id -------------------------------------------

  router.put('byid/:id', async (req, res) => {
    try {
      const categoryData = await Category.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      if (!categoryData[0]) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      res.status(200).json(categoryData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //export out category routes---------------------------------

module.exports = router;