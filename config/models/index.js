// -----------------------------------------------------------------------------
// Program:  Index.js
// Purpose:  Establish Relationships between Tables.
// Input:    <none>   
// -----------------------------------------------------------------------------
// Author:   
// Date:     May 19, 2021
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------
const Category = require('./Category');
const Item = require('./Item');
const League = require('./League');
const SubCategory = require('./SubCategory');
const Team = require('./Team');
const User = require('./user');
const UserInterests = require('./UserInterests');

// Teams belongsTo Leagues
Team.belongsTo(League, {
  foreignKey: 'league_id',
});

// Leagues have many Teams
League.hasMany(Team, {
  foreignKey: 'league_id',
  onDelete: 'RESTRICT',
});

// SubCategories belongsTo Categories
SubCategory.belongsTo(Category, {
  foreignKey: 'category_id',
});

// Leagues have many Teams
Category.hasMany(SubCategory, {
  foreignKey: 'category_id',
  onDelete: 'RESTRICT',
});

// UserInterests belongsTo Users
UserInterests.belongsTo(User, {
  foreignKey: 'user_id',
});

// Users have many UserInterests
User.hasMany(UserInterests, {
  foreignKey: 'user_id',
  onDelete: 'RESTRICT',
});

// Products belongToMany Tags (through ProductTag)
// Product.belongsToMany(Tag, {
//   through: ProductTag,
//   foreignKey: 'product_id',
//});


// -----------------------------------------------------------------------------
// Module Exports
// -----------------------------------------------------------------------------
module.exports = {
  Category,
  Item,
  League,
  SubCategory,
  Team,
  User,
  UserInterests
};
