const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const assetController = require('../controllers/AssetController');

router.get('/', auth, assetController.getAllAssets);           
router.post('/', auth, assetController.createAsset);       
router.get('/:id', auth, assetController.getAssetById);  

module.exports = router;
