'use strict';
module.exports = (sequelize, DataTypes) => {
  const usersStories = sequelize.define('usersStories', {
    userId: DataTypes.INTEGER,
    storyId: DataTypes.INTEGER
  }, {});
  usersStories.associate = function(models) {
    // associations can be defined here
  };
  return usersStories;
};