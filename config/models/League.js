// -----------------------------------------------------------------------------
// Class:    League.js
// Purpose:  Model for League Table.
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
// Class: League - Initialize table by extending Sequelize's Model Class
// -----------------------------------------------------------------------------
class League extends Model {}

// Set up fields and rules for League model
League.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    initials: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    leagueLogo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'league',
  }
);


// -----------------------------------------------------------------------------
// Module Exports
// -----------------------------------------------------------------------------
module.exports = League;
