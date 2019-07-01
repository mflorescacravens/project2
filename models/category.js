'use strict';
module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define('category', {
    name: DataTypes.STRING,
    userid: DataTypes.INTEGER
  }, {});
  category.associate = function(models) {
    // associations can be defined here
  };
  return category;
};