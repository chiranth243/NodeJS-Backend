const express = require('express');
const router = express.Router();
const assetController = require('../controllers/AssetController');

router.get('/', assetController.getAllAssets);           // GET /api/assets
router.post('/', assetController.createAsset);           // POST /api/assets
router.get('/:id', assetController.getAssetById);        // GET /api/assets/:id

module.exports = router;
