'use strict';
module.exports = (sequelize, DataTypes) => {
  const categoriesStories = sequelize.define('categoriesStories', {
    categoryId: DataTypes.INTEGER,
    storyId: DataTypes.INTEGER
  }, {});
  categoriesStories.associate = function(models) {
    // associations can be defined here
  };
  return categoriesStories;
};