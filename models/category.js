'use strict';
module.exports = function(sequelize, DataTypes) {
    var Category = sequelize.define('Category', {
        cat_name: DataTypes.STRING,
        cat_status: DataTypes.INTEGER,
        cat_url: DataTypes.STRING
    }, {
        //tableName: 'categories',
        timestamps: false,
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                Category.hasMany(models.New, {
                    foreignKey: 'news_category'
                });
            }
        }
    });
    return Category;
};