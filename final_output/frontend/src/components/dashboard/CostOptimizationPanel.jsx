import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const CostOptimizationPanel = () => {
    const data = [
        { name: 'Holding', manual: 1200, ai: 850 },
        { name: 'Shortage', manual: 800, ai: 200 },
        { name: 'Logistics', manual: 1500, ai: 1100 },
    ];

    return (
        <div className="card">
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '20px' }}>Cost Optimization (AI vs Manual)</h3>

            <div style={{ height: '240px', marginBottom: '20px' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                        <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                        <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: '20px', fontSize: '12px' }} />
                        <Bar dataKey="manual" name="Manual Process" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="ai" name="AI Optimized" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Cost</p>
                    <p style={{ fontSize: '1rem', fontWeight: 700, color: '#dc2626' }}>$2,150</p>
                    <p style={{ fontSize: '0.65rem', color: '#16a34a' }}>-24% AI Saving</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Holding Cost</p>
                    <p style={{ fontSize: '1rem', fontWeight: 700 }}>$850</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Shortage Cost</p>
                    <p style={{ fontSize: '1rem', fontWeight: 700 }}>$200</p>
                </div>
            </div>
        </div>
    );
};

export default CostOptimizationPanel;
