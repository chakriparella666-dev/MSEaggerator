const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const MSE = require('../models/MSE');

// ──── ORDERS ────

// GET all orders (newest first)
router.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST place a new order
router.post('/orders', async (req, res) => {
    try {
        const { buyerName, product, quantityKg, location } = req.body;
        if (!buyerName || !product || !quantityKg || !location) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Find available MSEs for this product
        const mses = await MSE.find({
            product: { $regex: product, $options: 'i' },
            availableKg: { $gt: 0 }
        });
        const assignedMSEs = mses.map(m => m.name);

        const order = new Order({ buyerName, product, quantityKg, location, assignedMSEs });
        await order.save();
        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PATCH advance order to next step
router.patch('/orders/:id/status', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ error: 'Order not found' });
        order.advance();
        await order.save();
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE an order
router.delete('/orders/:id', async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ──── MSEs ────

// GET all MSEs
router.get('/mses', async (req, res) => {
    try {
        const mses = await MSE.find().sort({ registeredAt: -1 });
        res.json(mses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST register a new MSE
router.post('/mses', async (req, res) => {
    try {
        const { name, product, district, capacityKg, availableKg } = req.body;
        if (!name || !product || !district || !capacityKg || !availableKg) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const mse = new MSE({ name, product, district, capacityKg, availableKg });
        await mse.save();
        res.status(201).json(mse);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ──── STEP LIST ────
router.get('/steps', (req, res) => {
    res.json(Order.schema.path('status').enumValues);
});

module.exports = router;
