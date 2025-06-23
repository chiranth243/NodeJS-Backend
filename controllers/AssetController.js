const db = require('../models');

exports.getAllAssets = async (req, res) => {
  try {
    const assets = await db.Asset.findAll();
    res.status(200).json({ assets });
  } catch (err) {
    console.error('Error fetching assets:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.createAsset = async (req, res) => {
  const { name, symbol, type, price } = req.body;

  if (!name || !symbol || !type || price == null) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  try {
    const newAsset = await db.Asset.create({ name, symbol, type, price });
    res.status(201).json({ message: 'Asset created', asset: newAsset });
  } catch (err) {
    console.error('Error creating asset:', err);
    res.status(500).json({ message: 'Error creating asset' });
  }
};

// GET asset by ID (optional)
exports.getAssetById = async (req, res) => {
  try {
    const asset = await db.Asset.findByPk(req.params.id);

    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' });
    }

    res.status(200).json({ asset });
  } catch (err) {
    console.error('Error getting asset by ID:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
