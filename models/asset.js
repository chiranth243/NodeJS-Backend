'use strict';

module.exports = (sequelize, DataTypes) => {
  const Asset = sequelize.define('Asset', {
    name: DataTypes.STRING,
    type: DataTypes.ENUM('stock', 'mutual_fund')
  }, {tableName: 'assets',});

  Asset.associate = (models) => {
    Asset.hasMany(models.Portfolio, {
      foreignKey: 'asset_id'
    });
  };

  return Asset;
};
