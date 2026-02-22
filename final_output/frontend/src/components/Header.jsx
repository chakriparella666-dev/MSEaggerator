import React from 'react';
import { Bell, User, LogOut } from 'lucide-react';

const Header = ({ user, onLogout }) => {
    return (
        <header style={{
            height: 'var(--header-height)',
            backgroundColor: '#ffffff',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            position: 'fixed',
            top: 0,
            left: 'var(--sidebar-width)',
            right: 0,
            zIndex: 100
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '-0.5px' }}>MSE Aggregator</h2>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <input
                    type="text"
                    placeholder="Search products, analytics..."
                    style={{
                        padding: '8px 16px',
                        width: '300px',
                        borderRadius: '4px',
                        border: '1px solid #ddd',
                        fontSize: '0.875rem',
                        outline: 'none'
                    }}
                />

                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                    <Bell size={20} />
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-main)' }}>Hello, {user?.name || 'User'}</span>
                </div>

                <button
                    onClick={onLogout}
                    style={{
                        padding: '6px 12px',
                        borderRadius: '4px',
                        border: '1px solid #ddd',
                        backgroundColor: '#f3f3f3',
                        color: 'var(--text-main)',
                        fontSize: '0.875rem',
                        cursor: 'pointer',
                        fontWeight: 500
                    }}
                >
                    Logout
                </button>
            </div>
        </header>
    );
};

export default Header;
