'use strict';

module.exports = (sequelize, DataTypes) => {
  const Portfolio = sequelize.define('Portfolio', {
    user_id: DataTypes.INTEGER,
    asset_id: DataTypes.INTEGER,
    quantity: DataTypes.DECIMAL(10, 2)
  }, {});

  Portfolio.associate = (models) => {
    Portfolio.belongsTo(models.User, {
      foreignKey: 'user_id'
    });
    Portfolio.belongsTo(models.Asset, {
      foreignKey: 'asset_id'
    });
  };

  return Portfolio;
};
