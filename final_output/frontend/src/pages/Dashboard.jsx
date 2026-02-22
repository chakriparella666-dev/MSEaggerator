import React, { useState, useEffect } from 'react';
import KPISection from '../components/dashboard/KPISection';
import ForecastChart from '../components/dashboard/ForecastChart';
import ProductionPanel from '../components/dashboard/ProductionPanel';
import InventoryPanel from '../components/dashboard/InventoryPanel';
import AlertsSection from '../components/dashboard/AlertsSection';
import CostOptimizationPanel from '../components/dashboard/CostOptimizationPanel';
import axios from 'axios';

const Dashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [kpiRes, forecastRes, inventoryRes, alertsRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/dashboard/kpis'),
                    axios.get('http://localhost:5000/api/dashboard/forecast'),
                    axios.get('http://localhost:5000/api/dashboard/inventory'),
                    axios.get('http://localhost:5000/api/dashboard/alerts')
                ]);

                setData({
                    kpis: kpiRes.data,
                    forecast: forecastRes.data.data,
                    inventory: inventoryRes.data.items,
                    alerts: alertsRes.data
                });
                setLoading(false);
            } catch (err) {
                console.error('Error fetching dashboard data:', err);
                // Fallback for demo if backend not running
                setData({
                    kpis: {
                        demand: { value: 12500, label: 'Next 30-Day Demand', change: 12 },
                        production: { value: 11000, label: 'Recommended Production', change: -5 },
                        profit: { value: 45000, label: 'Expected Profit', change: 8 },
                        risk: { value: 15, label: 'Stock-Out Risk %', change: 2 }
                    },
                    forecast: [],
                    inventory: [],
                    alerts: []
                });
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading Dashboard...</div>;

    return (
        <>
            <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#111' }}>Dashboard</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem' }}>Welcome back, {user.name}. Here's the latest for your MSE.</p>
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
            </div>

            <KPISection data={data.kpis} />

            <div className="chart-grid">
                <ForecastChart data={data.forecast} />
                <CostOptimizationPanel />
            </div>

            <div className="chart-grid">
                <ProductionPanel />
                <InventoryPanel items={data.inventory} />
            </div>

            <div style={{ marginTop: '24px' }}>
                <AlertsSection alerts={data.alerts} />
            </div>
        </>
    );
};

export default Dashboard;
