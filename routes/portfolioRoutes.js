const express = require('express');
const router = express.Router();
const { getUserPortfolio } = require('../controllers/portfolioController');
const { createOrUpdatePortfolio } = require('../controllers/portfolioCreateController');

router.get('/:userId', getUserPortfolio);
router.post('/create', createOrUpdatePortfolio);

module.exports = router;

