const router = require('express').Router();
const bcrypt = require('bcrypt');
// const { User, UserInterests } = require('../../models');
const { User, UserInterests } = require('../../config/models');


// The `/api/user` endpoint

router.get('/', async(req, res) => {
  // find all users
  
  try {
    const userData = await User.findAll({
      include: [{ model: User }],
    });
    if (!userData) res.status(404).json({ message: 'No users exist.' });
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async(req, res) => {
  // find one user by its `id` value
 
  try {
    const userData = await User.findByPk(req.params.id, {
      include: [{ model: UserInterests }],
    });
    if (!userData) res.status(404).json({ message: `The requested user ${req.params.id} does not exist.` });
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async(req, res) => {
  // create a new user
  try {
	req.body.password = await bcrypt.hash(req.body.password, 10);
	const userData = await User.create(req.body);
	res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async(req, res) => {
  // update a user by its `id` value
  try {
    const userData = await User.update(req.body,{
      where: {
        id: req.params.id,
      }
    });

    if (!userData) {
      res.status(404).json({ message: `User ${req.params.id} does not exist.` });
      return;
    }

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async(req, res) => {
  // delete a user by its `id` value
  try {
    const userData = await User.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!userData) {
      res.status(404).json({ message: `User: ${req.params.id} does not exist.` });
      return;
    }

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;