const db = require('../models');
const redisClient = require('../utils/redisClient');

exports.getUserPortfolio = async (req, res) => {
  const userId = req.params.userId;

  try {
    const portfolio = await db.Portfolio.findAll({
      where: { user_id: userId },
      include: [{ model: db.Asset }]
    });

    const result = [];
    let totalValue = 0;

    for (const item of portfolio) {
      const asset = item.Asset;
      const redisKey = `asset:${asset.id}:price`;

      let price = await redisClient.get(redisKey);
      price = price ? parseFloat(price) : 100;

      const value = item.quantity * price;
      totalValue += value;

      result.push({
        id: asset.id,
        assetName: asset.name,
        assetType: asset.type,
        quantity: item.quantity,
        price,
        value: value.toFixed(2),
        date: asset.createdAt
      });
    }

    res.json({ userId, totalValue: totalValue.toFixed(2), holdings: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch portfolio' });
  }
};


