const express = require('express');
const router = express.Router();
const Stock = require('../models/Stock');
const Portfolio = require('../models/Portfolio');

// Get all stocks in market
router.get('/market', async (req, res) => {
    try {
        const stocks = await Stock.find();
        res.json(stocks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get user's portfolio
router.get('/portfolio/:userId', async (req, res) => {
    try {
        const portfolio = await Portfolio.findOne({ userId: req.params.userId }).populate('stocks.stockId');
        if (!portfolio) return res.status(404).json({ message: 'No portfolio found' });
        res.json(portfolio);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Buy stocks
router.post('/buy', async (req, res) => {
    const { userId, stockId, quantity } = req.body;

    try {
        const stock = await Stock.findById(stockId);
        if (!stock) return res.status(404).json({ message: 'Stock not found' });

        let portfolio = await Portfolio.findOne({ userId });
        if (!portfolio) {
            portfolio = new Portfolio({ userId, stocks: [] });
        }

        const stockIndex = portfolio.stocks.findIndex(s => s.stockId.equals(stockId));
        if (stockIndex > -1) {
            portfolio.stocks[stockIndex].quantity += quantity;
        } else {
            portfolio.stocks.push({ stockId, quantity });
        }

        await portfolio.save();
        res.json({ message: 'Stock purchased successfully', portfolio });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Sell stocks
router.post('/sell', async (req, res) => {
    const { userId, stockId, quantity } = req.body;

    try {
        let portfolio = await Portfolio.findOne({ userId });
        if (!portfolio) return res.status(404).json({ message: 'No portfolio found' });

        const stockIndex = portfolio.stocks.findIndex(s => s.stockId.equals(stockId));
        if (stockIndex === -1) return res.status(400).json({ message: 'Stock not in portfolio' });

        if (portfolio.stocks[stockIndex].quantity < quantity) {
            return res.status(400).json({ message: 'Not enough stock to sell' });
        }

        portfolio.stocks[stockIndex].quantity -= quantity;
        if (portfolio.stocks[stockIndex].quantity === 0) {
            portfolio.stocks.splice(stockIndex, 1);
        }

        await portfolio.save();
        res.json({ message: 'Stock sold successfully', portfolio });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
