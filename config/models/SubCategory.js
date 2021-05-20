// -----------------------------------------------------------------------------
// Class:    SubCategory.js
// Purpose:  Model for SubCategory Table.
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
// Class: SubCategory - Initialize table by extending Sequelize's Model Class
// -----------------------------------------------------------------------------
class SubCategory extends Model {}

// Set up fields and rules for SubCategory model
SubCategory.init(
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
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'subCategory',
  }
);


// -----------------------------------------------------------------------------
// Module Exports
// -----------------------------------------------------------------------------
module.exports = SubCategory;
