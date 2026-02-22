import React from 'react';

const ProductionPanel = () => {
    const schedule = [
        { week: 'Week 1', quantity: 2500, status: 'Completed' },
        { week: 'Week 2', quantity: 3000, status: 'In Progress' },
        { week: 'Week 3', quantity: 2800, status: 'Scheduled' },
        { week: 'Week 4', quantity: 2700, status: 'Pending' },
    ];

    return (
        <div className="card">
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '16px' }}>Production Optimization</h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                <div style={{ padding: '16px', backgroundColor: '#f0f9ff', borderRadius: '8px', border: '1px solid #bae6fd' }}>
                    <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#0369a1', textTransform: 'uppercase' }}>Optimal Quantity (Q*)</p>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0369a1' }}>11,000</h2>
                </div>
                <div style={{ padding: '16px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid var(--border)' }}>
                    <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Safety Stock</p>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 700 }}>1,200</h2>
                </div>
            </div>

            <h4 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '12px' }}>Suggested Schedule</h4>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                <thead>
                    <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left' }}>
                        <th style={{ padding: '8px 0', color: 'var(--text-muted)', fontWeight: 500 }}>Period</th>
                        <th style={{ padding: '8px 0', color: 'var(--text-muted)', fontWeight: 500 }}>Quantity</th>
                        <th style={{ padding: '8px 0', color: 'var(--text-muted)', fontWeight: 500 }}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {schedule.map((item, idx) => (
                        <tr key={idx} style={{ borderBottom: idx !== schedule.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                            <td style={{ padding: '12px 0', fontWeight: 500 }}>{item.week}</td>
                            <td style={{ padding: '12px 0' }}>{item.quantity.toLocaleString()}</td>
                            <td style={{ padding: '12px 0' }}>
                                <span style={{
                                    padding: '2px 8px',
                                    borderRadius: '12px',
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    backgroundColor: item.status === 'Completed' ? '#f0fdf4' : item.status === 'In Progress' ? '#fefce8' : '#f8fafc',
                                    color: item.status === 'Completed' ? '#16a34a' : item.status === 'In Progress' ? '#a16207' : '#64748b'
                                }}>
                                    {item.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductionPanel;
