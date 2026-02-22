import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, ComposedChart } from 'recharts';

const ForecastChart = ({ data }) => {
    return (
        <div className="card" style={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Demand Forecasting</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>AI-driven prediction vs Historical demand</p>
                </div>
                <select style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    border: '1px solid var(--border)',
                    fontSize: '0.875rem',
                    outline: 'none'
                }}>
                    <option>Last 6 Months</option>
                    <option>Next 30 Days</option>
                </select>
            </div>

            <div style={{ flex: 1, width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748b', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748b', fontSize: 12 }}
                        />
                        <Tooltip
                            contentStyle={{
                                borderRadius: '8px',
                                border: 'none',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="predicted"
                            fill="#dbeafe"
                            stroke="none"
                        />
                        <Line
                            type="monotone"
                            dataKey="historical"
                            stroke="#94a3b8"
                            strokeWidth={2}
                            dot={{ r: 4, fill: '#94a3b8' }}
                            activeDot={{ r: 6 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="predicted"
                            stroke="var(--primary)"
                            strokeWidth={3}
                            dot={{ r: 4, fill: 'var(--primary)' }}
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ForecastChart;
