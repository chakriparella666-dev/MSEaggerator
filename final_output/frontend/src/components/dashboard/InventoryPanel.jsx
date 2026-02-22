import React from 'react';

const InventoryPanel = ({ items }) => {
    if (!items) return null;

    return (
        <div className="card">
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '20px' }}>Inventory Optimization</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {items.map((item, idx) => (
                    <div key={idx}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <div>
                                <span style={{ fontWeight: 600, fontSize: '0.925rem' }}>{item.name}</span>
                                <span style={{
                                    marginLeft: '8px',
                                    padding: '2px 8px',
                                    borderRadius: '4px',
                                    fontSize: '0.7rem',
                                    fontWeight: 700,
                                    backgroundColor: item.risk === 'High' ? '#fee2e2' : item.risk === 'Medium' ? '#fef9c3' : '#dcfce7',
                                    color: item.risk === 'High' ? '#dc2626' : item.risk === 'Medium' ? '#a16207' : '#16a34a'
                                }}>
                                    {item.risk} RISK
                                </span>
                            </div>
                            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                                {item.current} / {item.reorder * 2}
                            </span>
                        </div>
                        <div style={{ width: '100%', height: '8px', backgroundColor: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{
                                width: `${Math.min((item.current / (item.reorder * 2)) * 100, 100)}%`,
                                height: '100%',
                                backgroundColor: item.current < item.reorder ? '#ef4444' : 'var(--primary)',
                                borderRadius: '4px'
                            }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            <span>Reorder Point: {item.reorder}</span>
                            <span>Holding Cost: ${item.cost}/unit</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InventoryPanel;
