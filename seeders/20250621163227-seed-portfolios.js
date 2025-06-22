'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const portfolios = [];
    const totalUsers = 250;
    const totalAssets = 20;
    const timestamp = new Date();

    for (let userId = 1; userId <= totalUsers; userId++) {
      const numberOfAssets = Math.floor(Math.random() * 4) + 1; // 1 to 4 assets per user
      const usedAssetIds = new Set();

      for (let i = 0; i < numberOfAssets; i++) {
        let assetId;

        do {
          assetId = Math.floor(Math.random() * totalAssets) + 1; // asset ID between 1–20
        } while (usedAssetIds.has(assetId));

        usedAssetIds.add(assetId);

        portfolios.push({
          user_id: userId,
          asset_id: assetId,
          quantity: (Math.random() * 100 + 1).toFixed(2),
          createdAt: timestamp,
          updatedAt: timestamp
        });
      }
    }

    await queryInterface.bulkInsert('portfolios', portfolios, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('portfolios', null, {});
  }
};
