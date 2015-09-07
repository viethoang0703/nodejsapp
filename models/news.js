'use strict';
module.exports = function(sequelize, DataTypes) {
  var News = sequelize.define('News', {
    news_tittle: DataTypes.STRING,
    news_category: DataTypes.STRING,
    news_image: DataTypes.STRING,
    news_status: DataTypes.INTEGER,
    news_detail: DataTypes.TEXT,
    news_url: DataTypes.STRING
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return News;
};