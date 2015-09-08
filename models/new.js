'use strict';
module.exports = function(sequelize, DataTypes) {
    var Category = sequelize.import('./category');
    var New = sequelize.define('New', {
        news_tittle: DataTypes.STRING,
        news_category: {
            type: DataTypes.INTEGER,
            references: {
                model: Category,
                key: 'id',
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            }
        },
        news_image: DataTypes.STRING,
        news_status: DataTypes.INTEGER,
        news_detail: DataTypes.TEXT,
        news_url: DataTypes.STRING
    }, {
        //tableName: 'news',
        timestamps: false,
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                New.belongsTo(models.Category, {
                    as: 'category',
                    foreignKey: 'news_category'
                });
            }
        }
    });
    return New;
};