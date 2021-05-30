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
const User = require('./User');
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

// UserInterests belongsTo Category
UserInterests.belongsTo(Category, {
  foreignKey: 'category_id',
});

// Categories have many UserInterests
Category.hasMany(UserInterests, {
  foreignKey: 'category_id',
  onDelete: 'RESTRICT',
});

// Item belongsTo User
Item.belongsTo(User, {
  foreignKey: 'user_id',
});

// Users have many Items
User.hasMany(Item, {
  foreignKey: 'user_id',
  onDelete: 'RESTRICT',
});

// Item belongsTo SubCategory
Item.belongsTo(SubCategory, {
  foreignKey: 'subCategory_id',
});

// SubCategories have many Items
SubCategory.hasMany(Item, {
  foreignKey: 'subCategory_id',
  onDelete: 'RESTRICT',
});

// Item belongsTo Team
Item.belongsTo(Team, {
  foreignKey: 'team_id',
});

// Teamss have many Items
Team.hasMany(Item, {
  foreignKey: 'team_id',
  onDelete: 'RESTRICT',
});

// Category belongsToMany SubCategory (through ProductTag)
// Category.belongsToMany(Item, {
//   through: SubCategory,
//   foreignKey: 'catalog_id',
// });


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
