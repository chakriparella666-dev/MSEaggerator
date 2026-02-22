const express = require('express');
const router = express.Router();

// Mock middleware for role check
const checkRole = (roles) => (req, res, next) => {
    // In a real app, you'd decode JWT here
    // For now, let the frontend handle access logic but keep backend ready
    next();
};

// ──── KPI Data ────
router.get('/kpis', (req, res) => {
    res.json({
        demand: { value: 12500, label: 'Next 30-Day Demand', change: 12, icon: 'trending-up' },
        production: { value: 11000, label: 'Recommended Production', change: -5, icon: 'factory' },
        profit: { value: 45000, label: 'Expected Profit', change: 8, icon: 'dollar-sign' },
        risk: { value: 15, label: 'Stock-Out Risk %', change: 2, icon: 'alert-triangle' }
    });
});

// ──── Forecast Data ────
router.get('/forecast', (req, res) => {
    res.json({
        data: [
            { date: '2024-01', historical: 4000, predicted: 4000 },
            { date: '2024-02', historical: 3000, predicted: 3200 },
            { date: '2024-03', historical: 2000, predicted: 2400 },
            { date: '2024-04', historical: 2780, predicted: 3000 },
            { date: '2024-05', historical: 1890, predicted: 2100 },
            { date: '2024-06', historical: 2390, predicted: 2500 },
            { date: '2024-07', historical: 3490, predicted: 3800 },
        ]
    });
});

// ──── Inventory Data ────
router.get('/inventory', (req, res) => {
    res.json({
        items: [
            { name: 'Raw Material A', current: 500, reorder: 200, cost: 50, risk: 'Low' },
            { name: 'Raw Material B', current: 150, reorder: 200, cost: 30, risk: 'Medium' },
            { name: 'Raw Material C', current: 50, reorder: 100, cost: 80, risk: 'High' }
        ]
    });
});

// ──── Alerts ────
router.get('/alerts', (req, res) => {
    res.json([
        { id: 1, title: 'Stock-Out Alert', description: 'Raw Material C will run out in 3 days.', level: 'Critical', time: '2 hours ago' },
        { id: 2, title: 'Demand Spike', description: '20% increase in demand predicted for next week.', level: 'Warning', time: '5 hours ago' },
        { id: 3, title: 'Price Update', description: 'Supplier prices for Material A decreased by 5%.', level: 'Info', time: '1 day ago' }
    ]);
});

module.exports = router;
