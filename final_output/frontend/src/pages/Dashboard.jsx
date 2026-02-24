import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './Dashboard.css';

const API = 'http://localhost:5000/api/dashboard';

const ORDER_STEPS = [
    'Order Placed', 'AI Matching', 'MSEs Notified',
    'Production', 'Pickup Arranged', 'Delivered', 'Payment Done', 'Subsidy Applied'
]; const STATUS_COLOR = {
    'Order Placed': '#2563eb',
    'AI Matching': '#7c3aed',
    'MSEs Notified': '#0891b2',
    'Production': '#16a34a',
    'Pickup Arranged': '#ea580c',
    'Delivered': '#0d9488',
    'Payment Done': '#b45309',
    'Subsidy Applied': '#be185d',
};

const Dashboard = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({ buyerName: '', product: '', quantityKg: '', location: '' });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [tab, setTab] = useState('orders');

    const fetchOrders = useCallback(async () => {
        try {
            const { data } = await axios.get(`${API}/orders`);
            setOrders(data);
        } catch { /* backend may not be running */ }
    }, []);

    const fetchData = useCallback(async () => {
        setLoading(true);
        await fetchOrders();
        setLoading(false);
    }, [fetchOrders]);

    useEffect(() => {
        fetchData();
        const interval = setInterval(() => {
            fetchOrders();
        }, 5000);
        return () => clearInterval(interval);
    }, [fetchData, fetchOrders]);

    const handlePlace = async (e) => {
        e.preventDefault();
        setError('');
        setSubmitting(true);
        try {
            await axios.post(`${API}/orders`, { ...form, quantityKg: Number(form.quantityKg) });
            setForm({ buyerName: '', product: '', quantityKg: '', location: '' });
            setTab('orders');
            fetchOrders();
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to place order. Is the backend running?');
        } finally { setSubmitting(false); }
    };

    const handleAdvance = async (id) => {
        try { await axios.patch(`${API}/orders/${id}/status`); fetchOrders(); }
        catch { /* ignore */ }
    };

    const handleDelete = async (id) => {
        try { await axios.delete(`${API}/orders/${id}`); fetchOrders(); }
        catch { /* ignore */ }
    };

    const stepIndex = (status) => ORDER_STEPS.indexOf(status);

    return (
        <div className="dash-wrap">
            {/* Header */}
            <div className="dash-header">
                <div>
                    <h1 className="dash-title">MSE Aggregator Dashboard</h1>
                    <p className="dash-sub">Welcome, <strong>{user.name || 'User'}</strong></p>
                </div>

            </div>

            {/* Two-column layout */}
            <div className="dash-columns">

                {/* LEFT — Orders */}
                <div className="dash-left">

                    {/* Tab Nav */}
                    <div className="tab-nav">
                        <button className={`tab-btn ${tab === 'orders' ? 'active' : ''}`} onClick={() => setTab('orders')}>
                            Orders ({orders.length})
                        </button>
                        <button className={`tab-btn ${tab === 'place' ? 'active' : ''}`} onClick={() => setTab('place')}>
                            Place New Order
                        </button>
                    </div>

                    {/* Place Order Form */}
                    {tab === 'place' && (
                        <form className="order-form" onSubmit={handlePlace}>
                            <h3 className="form-title">Place Buyer Order</h3>
                            {error && <div className="form-error">{error}</div>}
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Buyer Name</label>
                                    <input value={form.buyerName}
                                        onChange={e => setForm({ ...form, buyerName: e.target.value })} required />
                                </div>
                                <div className="form-group">
                                    <label>Product</label>
                                    <input value={form.product}
                                        onChange={e => setForm({ ...form, product: e.target.value })} required />
                                </div>
                                <div className="form-group">
                                    <label>Quantity (kg)</label>
                                    <input type="number" min="1" value={form.quantityKg}
                                        onChange={e => setForm({ ...form, quantityKg: e.target.value })} required />
                                </div>
                                <div className="form-group">
                                    <label>Delivery Location</label>
                                    <input value={form.location}
                                        onChange={e => setForm({ ...form, location: e.target.value })} required />
                                </div>
                            </div>
                            <button type="submit" className="btn-submit" disabled={submitting}>
                                {submitting ? 'Placing Order...' : 'Place Order →'}
                            </button>
                        </form>
                    )}

                    {/* Orders Table */}
                    {tab === 'orders' && (
                        <div>
                            {loading ? (
                                <p className="empty-msg">Loading orders...</p>
                            ) : orders.length === 0 ? (
                                <div className="empty-msg">
                                    No orders yet. Click <strong>"Place New Order"</strong> to create the first one.
                                </div>
                            ) : (
                                <div className="orders-list">
                                    {orders.map(order => (
                                        <div key={order._id} className="order-card">
                                            <div className="order-top">
                                                <div>
                                                    <span className="order-buyer">{order.buyerName}</span>
                                                    <span className="order-product"> · {order.product} · {order.quantityKg} kg · {order.location}</span>
                                                </div>
                                                <div className="order-actions">
                                                    <span className="status-badge"
                                                        style={{ background: STATUS_COLOR[order.status] + '20', color: STATUS_COLOR[order.status], border: `1px solid ${STATUS_COLOR[order.status]}` }}>
                                                        {order.status}
                                                    </span>
                                                    {stepIndex(order.status) < ORDER_STEPS.length - 1 && (
                                                        <button
                                                            className="btn-next"
                                                            onClick={() => handleAdvance(order._id)}
                                                            title={`Advance to ${ORDER_STEPS[stepIndex(order.status) + 1]}`}
                                                        >
                                                            Next Step →
                                                        </button>
                                                    )}
                                                    <button className="btn-del" onClick={() => handleDelete(order._id)}>✕</button>
                                                </div>
                                            </div>

                                            {/* Progress Bar */}
                                            <div className="progress-bar">
                                                {ORDER_STEPS.map((step, idx) => (
                                                    <div
                                                        key={step}
                                                        className={`progress-step ${idx < stepIndex(order.status) ? 'done' : idx === stepIndex(order.status) ? 'current' : ''}`}
                                                        title={step}
                                                    />
                                                ))}
                                            </div>

                                            {order.assignedMSEs?.length > 0 && (
                                                <p className="order-mses">🏭 Assigned MSEs: {order.assignedMSEs.join(', ')}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div> {/* end dash-left */}

                {/* RIGHT — Project Flowchart */}
                <div className="dash-right">
                    <h3 className="flow-title">Project Flow</h3>

                    <div className="fc-wrap">
                        <div className="fc-node">
                            <div className="fc-content">
                                <div className="fc-label">Buyer</div>
                                <div className="fc-desc">Places order</div>
                            </div>
                        </div>

                        <div className="fc-node">
                            <div className="fc-content">
                                <div className="fc-label">AI Platform</div>
                                <div className="fc-desc">Matches demand</div>
                            </div>
                        </div>

                        <div className="fc-node">
                            <div className="fc-content">
                                <div className="fc-label">MSEs</div>
                                <div className="fc-desc">Produce goods</div>
                            </div>
                        </div>

                        <div className="fc-node">
                            <div className="fc-content">
                                <div className="fc-label">Inventory</div>
                                <div className="fc-desc">Tracks stock</div>
                            </div>
                        </div>

                        <div className="fc-node">
                            <div className="fc-content">
                                <div className="fc-label">Logistics</div>
                                <div className="fc-desc">Optimises routes</div>
                            </div>
                        </div>

                        <div className="fc-node">
                            <div className="fc-content">
                                <div className="fc-label">Delivery</div>
                                <div className="fc-desc">Consolidated delivery</div>
                            </div>
                        </div>

                        <div className="fc-node">
                            <div className="fc-content">
                                <div className="fc-label">Payment</div>
                                <div className="fc-desc">Splits payment</div>
                            </div>
                        </div>

                        <div className="fc-node">
                            <div className="fc-content">
                                <div className="fc-label">Govt Schemes</div>
                                <div className="fc-desc">Applies subsidy</div>
                            </div>
                        </div>
                    </div>
                </div> {/* end dash-right */}

            </div> {/* end dash-columns */}

            {/* Footer */}
            <footer className="dash-footer">
                <p>© 2026 MSE Aggregator Platform · <a href="https://github.com/chakriparella666-dev/MSEaggerator.git" target="_blank" rel="noreferrer">GitHub Repository</a></p>
            </footer>
        </div>
    );
};

export default Dashboard;
