// -----------------------------------------------------------------------------
// Class:    Item.js
// Purpose:  Model for Item Table.
// Input:    <none>   
// -----------------------------------------------------------------------------
// Author:   Mark Harrison
// Date:     May 19, 2021
// -----------------------------------------------------------------------------


// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../connection.js');


// -----------------------------------------------------------------------------
// Class: Item - Initialize table by extending Sequelize's Model Class
// -----------------------------------------------------------------------------
class Item extends Model { }

// Set up fields and rules for Item model
Item.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    subCategory_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'subCategory',
        key: 'id'
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    autographed: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    playerName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    playerSoundex: {
      type: DataTypes.STRING,
      allowNull: false
    },
    team_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'team',
        key: 'id'
      }
    },
    price: {
      type: DataTypes.DECIMAL(9, 2),
      allowNull: false
    },
    dateListed: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'item',
  }
);


// -----------------------------------------------------------------------------
// Module Exports
// -----------------------------------------------------------------------------
module.exports = Item;
