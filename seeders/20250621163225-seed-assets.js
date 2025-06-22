'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const assets = [
      { name: 'Apple Inc.', type: 'stock' },
      { name: 'Google (Alphabet Inc.)', type: 'stock' },
      { name: 'Microsoft Corporation', type: 'stock' },
      { name: 'Tesla Inc.', type: 'stock' },
      { name: 'Meta Platforms (Facebook)', type: 'stock' },
      { name: 'Amazon.com Inc.', type: 'stock' },
      { name: 'Reliance Industries Ltd.', type: 'stock' },
      { name: 'Infosys Ltd.', type: 'stock' },
      { name: 'Tata Consultancy Services (TCS)', type: 'stock' },
      { name: 'HDFC Bank Ltd.', type: 'stock' },
      { name: 'SBI Bluechip Fund', type: 'mutual_fund' },
      { name: 'Axis Long Term Equity Fund', type: 'mutual_fund' },
      { name: 'ICICI Prudential Bluechip Fund', type: 'mutual_fund' },
      { name: 'Nippon India Growth Fund', type: 'mutual_fund' },
      { name: 'UTI Nifty Index Fund', type: 'mutual_fund' },
      { name: 'HDFC Mid-Cap Opportunities Fund', type: 'mutual_fund' },
      { name: 'Parag Parikh Flexi Cap Fund', type: 'mutual_fund' },
      { name: 'Mirae Asset Large Cap Fund', type: 'mutual_fund' },
      { name: 'Kotak Emerging Equity Fund', type: 'mutual_fund' },
      { name: 'Aditya Birla Sun Life Tax Relief 96', type: 'mutual_fund' },
    ];

    const timestamp = new Date();
    const withTimestamps = assets.map(asset => ({
      ...asset,
      createdAt: timestamp,
      updatedAt: timestamp
    }));

    await queryInterface.bulkInsert('assets', withTimestamps, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('assets', null, {});
  }
};
