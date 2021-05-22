//Omari Routes

const router = require('express').Router();
const { Team } = require('gt-bootcamp-project02-Team_Genesis/config/models/Team.js');

// GET all TEAMS
router.get('/', async (req, res) => {
    try {
      const itemData = await Team.findAll({
      });
      res.status(200).json(itemData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
     

// GET a single TEAM
router.get('/:id', async (req, res) => {
    try {
      const teamData = await Team.findByPk(req.params.id, {
      });
  
      if (!teamData) {
        res.status(404).json({ message: 'No Team found with that id!' });
        return;
      }
  
      res.status(200).json(teamData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //Create a new TEAM
  router.post('/', async (req, res) => {
    try {
      const teamData = await Team.create({
        reader_id: req.body.reader_id,
      });
      res.status(200).json(teamData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

    //Delete a TEAM
  router.delete('/:id', async (req, res) => {
    try {
      const teamData = await Team.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      if (!teamData) {
        res.status(404).json({ message: 'No Team found with that id!' });
        return;
      }
  
      res.status(200).json(teamData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //Update A Team
  router.put("/:id", (req, res) => {
    Team.update(
      {
        city: req.body.id,
        name: req.body.initials,
        leauge_id: req.body.leauge_id,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((updatedTeam) => {
        res.json(updatedTeam);
      })
      .catch((err) => res.json(err));
    })