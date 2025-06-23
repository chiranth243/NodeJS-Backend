const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const portfolioController = require('../controllers/portfolioController');
const portfolioCreateController = require('../controllers/portfolioCreateController');

// Protect these routes with JWT auth
router.get('/:userId', auth, portfolioController.getUserPortfolio);
router.post('/create', auth, portfolioCreateController.createOrUpdatePortfolio);

module.exports = router;

