const cron = require('node-cron');
const db = require('../models');

// 👇 Simulate getting prices from external source
const mockPrices = () => {
    const symbols = [
        'AAPL', 'GOOG', 'MSFT', 'TSLA', 'META', 'AMZN',
        'RELIANCE', 'INFY', 'TCS', 'HDFC',
        'SBI', 'AXIS', 'ICICI', 'NIPPON', 'UTI',
        'HDFC_MID', 'PPFAS', 'MIRAE', 'KOTAK', 'ADITYA'
    ];

    const prices = {};

    symbols.forEach(symbol => {
        const basePrice = 100 + Math.random() * 900; // random base between 100–1000

        const trend = Math.random(); // 0 to 1

        let change = 0;

        if (trend < 0.33) {
            // price goes down by 0–5%
            change = -basePrice * (Math.random() * 0.05);
        } else if (trend < 0.66) {
            // price stays mostly the same (±1%)
            change = basePrice * (Math.random() * 0.02 - 0.01);
        } else {
            // price goes up by 0–5%
            change = basePrice * (Math.random() * 0.05);
        }

        prices[symbol] = parseFloat((basePrice + change).toFixed(2));
    });

    return prices;
};


const updateAssetPricesAndPortfolios = async () => {
    try {
        console.log(`[CRON] Running price update at ${new Date().toLocaleTimeString()}`);

        const prices = mockPrices();
        const assets = await db.Asset.findAll();

        // Update each asset with new price
        for (const asset of assets) {
            if (prices[asset.symbol]) {
                asset.price = prices[asset.symbol];
                await asset.save();
            }
        }

        // Recalculate portfolios
        const portfolios = await db.Portfolio.findAll({
            include: db.Asset
        });

        for (const portfolio of portfolios) {
            const latestPrice = portfolio.Asset.price;
            portfolio.value = portfolio.quantity * latestPrice;
            await portfolio.save();
        }

        console.log(`[CRON] Asset prices and portfolio values updated.`);
        const io = require('../app').get('io');
        io.emit('portfolioUpdate');
    } catch (error) {
        console.error('Error during scheduled update:', error);
    }
};

// Schedule: every 10 minutes
cron.schedule('*/10 * * * *', updateAssetPricesAndPortfolios);

module.exports = updateAssetPricesAndPortfolios;
