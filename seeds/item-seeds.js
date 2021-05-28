// -----------------------------------------------------------------------------
// Program:  item-seeds.js
// Purpose:  Build and populate the item table.
// Input:    <none>   
// -----------------------------------------------------------------------------
// Author:   
// Date:     May xx, 2021
// -----------------------------------------------------------------------------


// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------
const { League } = require('../config/models');  // Object models relate to DB


// -----------------------------------------------------------------------------
// Item Data Values
// -----------------------------------------------------------------------------
const itemData = [
  {
    user_id:1,
    subcategory_id: 1,      
    description: 'Reebok White Jersey',
    autographed: '1', 
    playerName: 'Brett Favre',
    playerSoundex: soundex('Brett Favre'), 
    team_id: 3, 
    price: 6000.00,
    dateListed:'2021-05-18',
    image: 'https://res.cloudinary.com/dui0ghwal/image/upload/v1622169036/preset_folder/r211uuxnyqt1hl7xhemj.png'
  },
  {
    user_id: 1, 
    subcategory_id: 1,      
    description: 'Reebok Green Jersey',
    autographed: '1', 
    playerName: 'Brett Favre',
    playerSoundex: soundex('Brett Favre'), 
    team_id: 3, 
    price: 6500.00,
    dateListed:'2021-05-18',
    image: 'https://res.cloudinary.com/dui0ghwal/image/upload/v1622169036/preset_folder/r211uuxnyqt1hl7xhemj.png'
  },
  {
    user_id: 1, 
    subcategory_id: 7,      
    description: 'Spalding Baseball',
    autographed: '1', 
    playerName: 'Hank Aaron',
    playerSoundex: soundex('Brett Favre'), 
    team_id: 3, 
    price: 6500.00,
    dateListed:'2021-05-18',
    image: 'https://res.cloudinary.com/dui0ghwal/image/upload/v1622169036/preset_folder/r211uuxnyqt1hl7xhemj.png'
  }, 
];


// -----------------------------------------------------------------------------
// Use Sequalize to do multi-insert into table.
// -----------------------------------------------------------------------------
const seedItems = () => Item.bulkCreate(itemData);


// -----------------------------------------------------------------------------
// Module Exports
// -----------------------------------------------------------------------------
module.exports = seedItems;