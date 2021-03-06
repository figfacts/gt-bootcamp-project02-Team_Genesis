// -----------------------------------------------------------------------------
// Class:    User.js
// Purpose:  Model for User Table.
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
const bcrypt = require('bcrypt');


// -----------------------------------------------------------------------------
// Class: User - Initialize table by extending Sequelize's Model Class
// -----------------------------------------------------------------------------
class User extends Model {}

// Set up fields and rules for User model
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
  },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
  },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    signUpDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    itemsCountSold: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    itemsPriceSold: {
      type: DataTypes.DECIMAL(9, 2),
      allowNull: true
    },
    itemsCountBought: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    itemsPriceBought: {
      type: DataTypes.DECIMAL(9, 2),
      allowNull: true
    },
  },
  {
    hooks: {
      // has password
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
      }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    // underscored: true,
    modelName: 'User',
  }
);


// -----------------------------------------------------------------------------
// Module Exports
// -----------------------------------------------------------------------------
module.exports = User;
