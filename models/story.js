'use strict';
module.exports = (sequelize, DataTypes) => {
  const story = sequelize.define('story', {
    title: DataTypes.STRING,
    url: DataTypes.STRING
  }, {});
  story.associate = function(models) {
    // associations can be defined here
    models.story.belongsToMany(models.user, {through: 'usersStories'});
  };
  return story;
};