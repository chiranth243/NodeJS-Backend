const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const portfolioRoutes = require("./routes/portfolioRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/portfolio", portfolioRoutes);

const portfolio_create = require("./routes/portfolioRoutes")
app.use("/api/portfolio-create", portfolio_create);

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const updateAssetPricesAndPortfolios = require('./Jobs/updatePricesJob');
updateAssetPricesAndPortfolios();

const assetRoutes = require('./routes/assetRoutes');
app.use('/api/assets', assetRoutes);

app.get("/", (req, res) => {
    res.send("Asset View Backend is running...");
});

module.exports = app;
