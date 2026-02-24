const mongoose = require('mongoose');

const ORDER_STEPS = [
    'Order Placed',
    'AI Matching',
    'MSEs Notified',
    'Production',
    'Pickup Arranged',
    'Delivered',
    'Payment Done',
    'Subsidy Applied'
];

const orderSchema = new mongoose.Schema({
    buyerName: { type: String, required: true, trim: true },
    product: { type: String, required: true, trim: true },
    quantityKg: { type: Number, required: true },
    location: { type: String, required: true, trim: true },
    status: { type: String, enum: ORDER_STEPS, default: 'Order Placed' },
    assignedMSEs: { type: [String], default: [] },
    createdAt: { type: Date, default: Date.now }
});

orderSchema.methods.advance = function () {
    const idx = ORDER_STEPS.indexOf(this.status);
    if (idx < ORDER_STEPS.length - 1) {
        this.status = ORDER_STEPS[idx + 1];
    }
    return this;
};

orderSchema.statics.STEPS = ORDER_STEPS;

module.exports = mongoose.model('Order', orderSchema);
