import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, TrendingUp, Box, Zap, AlertCircle, BarChart3, Users } from 'lucide-react';

const Sidebar = ({ role }) => {
    const menuItems = [
        { title: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/', always: true },
        { title: 'Forecast', icon: <TrendingUp size={20} />, path: '/forecast', always: true },
        { title: 'Inventory', icon: <Box size={20} />, path: '/inventory', always: true },
        { title: 'Optimization', icon: <Zap size={20} />, path: '/optimization', always: true },
        { title: 'Alerts', icon: <AlertCircle size={20} />, path: '/alerts', always: true },
        { title: 'District Analytics', icon: <BarChart3 size={20} />, path: '/analytics', role: 'aggregator' },
        { title: 'User Management', icon: <Users size={20} />, path: '/users', role: 'admin' },
    ];

    return (
        <aside style={{
            width: 'var(--sidebar-width)',
            backgroundColor: 'var(--bg-sidebar)',
            borderRight: '1px solid var(--border)',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            paddingTop: 'var(--header-height)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 50
        }}>
            <nav style={{ padding: '16px 8px' }}>
                {menuItems.map((item, index) => {
                    if (!item.always && item.role !== role) return null;

                    return (
                        <NavLink
                            key={index}
                            to={item.path}
                            style={({ isActive }) => ({
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '10px 16px',
                                borderRadius: '4px',
                                color: isActive ? 'var(--text-main)' : 'var(--text-muted)',
                                backgroundColor: isActive ? '#f3f3f3' : 'transparent',
                                marginBottom: '4px',
                                textDecoration: 'none',
                                fontWeight: isActive ? 600 : 500,
                                fontSize: '0.875rem',
                                borderLeft: isActive ? '4px solid var(--accent)' : '4px solid transparent',
                                transition: 'all 0.2s'
                            })}
                        >
                            {item.icon}
                            {item.title}
                        </NavLink>
                    );
                })}
            </nav>
        </aside>
    );
};

export default Sidebar;
