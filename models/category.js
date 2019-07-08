'use strict';
module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define('category', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate: function(category, option) {
        category.name = category.name.toLowerCase();
      }
    }
  });
  category.associate = function(models) {
    // associations can be defined here
    models.category.belongsToMany(models.story, {through: 'categoriesStories'})
  };
  return category;
};