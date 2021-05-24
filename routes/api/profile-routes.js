const router = require('express').Router();
const User = require('../config/models/User');
const UserInterests = require('../config/models/UserInterests');


// get one user information for profile
router.get('/:id', async (req, res) => {

try {
    const userData = await User.findByPk(req.params.id);
    if (!userData) {
        res.status(404).json({ message: 'User id not found.'});
        return;
    }
    res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});


    //more
    // User.findOne({
    //     include: {
    //         model: UserInterests,
    //         attributes: ['id','initials']
    //     }
    // })
    // .then(dbUserData => {
    //     if(!dbUserData) {
    //         res.status(404).json({message: 'User not found'});
    //         return;
    //     }
    //     console.log(dbUserData)
    //     res.json(dbUserData)
    // })
    // .catch(err => {
    //     console.log(err);
    //     res.status(500).json(err)
    // });
    // })



    // get user interest information
router.get('/:id', async (req, res) => {
    try {
        const userInterestData = await UserInterests.findByPk(req.params.id);
        if (!userInterestData) {
            res.status(404).json({ message: 'User information not found'});
            return
        }
        res.status(200).json(userInterestData);
    } catch (err) {
        res.status(500).json(err);
    }
    
});

//update profile information
router.put('/:id', async (req, res) => {
    try {
        const userData = await User.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if (!userData[0]) {
            res.status(404).json({ message: 'User not found'});
            return;
        }
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
    
})

router.delete('/:id', async (req, res) => {

})