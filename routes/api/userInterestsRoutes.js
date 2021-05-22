const router = require('express').Router();
const { UserInterests, User } = require('../../config/models');



// Routing: Get /api/userInterests - 


//Do we need all???
router.get('/', async (req, res) => {
  // find all of the users Interests
 
  try {
    const userInterestsData = await UserInterests.findAll({
      include: [{ model: User }],
    });
    if (!userInterestsData) res.status(404).json({ message: 'The user does not have any current interests.' });
    res.status(200).json(userInterestsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async(req, res) => {
    // find one interest by its `id` value
   
    try {
      const userInterestsData = await UserInterests.findByPk(req.params.id, {
        include: [{ model: User }],
      });
      if (!userInterestsData) res.status(404).json({ message: `User Interest: ${req.params.id} does not exist.` });
      res.status(200).json(userInterestsData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.post('/', async(req, res) => {
    // create a new interest for the user
    try {
      
      const userInterestsData = await UserInterests.create(req.body);
      res.status(200).json(userInterestsData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.put('/:id', async(req, res) => {
    // update a user by its `id` value
    try {
      const userInterestsData = await UserInterests.update(req.body,{
        where: {
          id: req.params.id,
        }
      });
  
      if (!userInterestsData) {
        res.status(404).json({ message: `User Interest:${req.params.id} does not exist.` });
        return;
      }
  
      res.status(200).json(userInterestsData);
    } catch (err) {
      res.status(500).json(err);
    }
  });


// -----------------------------------------------------------------------------
// Module Exports
// -----------------------------------------------------------------------------
module.exports = router;