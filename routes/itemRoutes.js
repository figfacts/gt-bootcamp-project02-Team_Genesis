//Omari Routes

const router = require('express').Router();
const { Item } = require('gt-bootcamp-project02-Team_Genesis/config/models/Item.js');
const { Model } = require('sequelize/types');

// GET all ITEMS
router.get('/', async (req, res) => {
    try {
      const itemData = await Item.findAll({
        // include: [{ Model: Item }]
      });
      res.status(200).json(itemData);
    } catch (err) {
      res.status(500).json(err);
    }
  });


// GET a single ITEM
router.get('/:id', async (req, res) => {
    try {
      const itemData = await Item.findByPk(req.params.id, {
      });
  
      if (!itemData) {
        res.status(404).json({ message: 'No Item found with that id!' });
        return;
      }
  
      res.status(200).json(itemData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //Create a new ITEM
  router.post('/', async (req, res) => {
    try {
      const itemData = await Item.create({
        reader_id: req.body.reader_id,
      });
      res.status(200).json(itemData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

    //Delete a ITEM
  router.delete('/:id', async (req, res) => {
    try {
      const itemData = await Item.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      if (!itemData) {
        res.status(404).json({ message: 'No Item found with that id!' });
        return;
      }
  
      res.status(200).json(itemData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //Update A ITEM
  router.put("/:id", (req, res) => {
    Item.update(
      {     
    description: req.body.description, 
    autographed: req.body.autographed,
    price: req.body.price,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((updatedItem) => {
        res.json(updatedItem);
      })
      .catch((err) => res.json(err));
    })



