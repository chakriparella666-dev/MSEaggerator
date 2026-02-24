const mongoose = require('mongoose');

const mseSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    product: { type: String, required: true, trim: true },
    district: { type: String, required: true, trim: true },
    capacityKg: { type: Number, required: true },
    availableKg: { type: Number, required: true },
    rating: { type: Number, default: 4.0, min: 1, max: 5 },
    registeredAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MSE', mseSchema);
