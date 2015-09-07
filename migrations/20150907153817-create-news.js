'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('News', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      news_tittle: {
        type: Sequelize.STRING
      },
      news_category: {
        type: Sequelize.STRING
      },
      news_image: {
        type: Sequelize.STRING
      },
      news_status: {
        type: Sequelize.INTEGER
      },
      news_detail: {
        type: Sequelize.TEXT
      },
      news_url: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('News');
  }
};