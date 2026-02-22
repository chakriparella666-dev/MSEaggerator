import React from 'react';
import { AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

const AlertCard = ({ title, description, level, time }) => {
    const styles = {
        Critical: { bg: '#fef2f2', border: '#fee2e2', color: '#dc2626', icon: <AlertCircle size={18} /> },
        Warning: { bg: '#fffbeb', border: '#fef3c7', color: '#d97706', icon: <AlertTriangle size={18} /> },
        Info: { bg: '#eff6ff', border: '#dbeafe', color: '#2563eb', icon: <Info size={18} /> },
    };

    const current = styles[level] || styles.Info;

    return (
        <div style={{
            backgroundColor: current.bg,
            border: `1px solid ${current.border}`,
            borderRadius: '8px',
            padding: '12px 16px',
            display: 'flex',
            gap: '12px',
            position: 'relative',
            marginBottom: '12px'
        }}>
            <div style={{ color: current.color, marginTop: '2px' }}>{current.icon}</div>
            <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: current.color }}>{title}</h4>
                <p style={{ fontSize: '0.825rem', color: '#475569', marginTop: '2px' }}>{description}</p>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px', display: 'block' }}>{time}</span>
            </div>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>
                <X size={14} />
            </button>
        </div>
    );
};

const AlertsSection = ({ alerts }) => {
    if (!alerts) return null;

    return (
        <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Smart Alerts</h3>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--primary)', cursor: 'pointer' }}>Mark all as read</span>
            </div>

            <div style={{ maxHeight: '350px', overflowY: 'auto', paddingRight: '4px' }}>
                {alerts.map(alert => (
                    <AlertCard key={alert.id} {...alert} />
                ))}
            </div>
        </div>
    );
};

export default AlertsSection;
