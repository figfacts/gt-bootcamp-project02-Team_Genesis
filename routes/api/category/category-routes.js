const { Category } = require('../../config/models/Category');
const { render } = require('../../server');

const router = require('express').Router();


// find all categories
  // be sure to include its associated Products
router.get('/', async (req, res) => {
 try {
        const categoryData =  await Category.findAll();
        return res.json(categoryData);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    }

});


router.get('/:id', async (req, res) => {
    // find one category by its `id` value
  // be sure to include its associated Products
  try {
      const categoryData = await Category.findByPk(req.params.id);
      return res.json(categoryData);
  } catch (err) {
      console.log(err);
      return res.status(500).json(err)
  }

})


module.exports = router;