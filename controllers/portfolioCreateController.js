const db = require('../models');

exports.createOrUpdatePortfolio = async (req, res) => {
  const { user_id, asset_id, quantity } = req.body;

  if (!user_id || !asset_id || quantity == null) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  try {
    const user = await db.User.findByPk(user_id);
    const asset = await db.Asset.findByPk(asset_id);

    if (!user || !asset) {
      return res.status(404).json({ message: 'User or Asset not found' });
    }

    let portfolio = await db.Portfolio.findOne({
      where: { user_id, asset_id }
    });

    if (portfolio) {
      // 🔁 Add to existing quantity
      const newQuantity = parseFloat(portfolio.quantity) + parseFloat(quantity);
      const newValue = newQuantity * asset.price;

      portfolio.quantity = newQuantity;
      portfolio.value = newValue;
      await portfolio.save();
    } else {
      // Create new portfolio entry
      portfolio = await db.Portfolio.create({
        user_id,
        asset_id,
        quantity: parseFloat(quantity),
        value: quantity * asset.price
      });
    }

    res.status(200).json({ message: 'Portfolio updated', portfolio });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating portfolio' });
  }
};
