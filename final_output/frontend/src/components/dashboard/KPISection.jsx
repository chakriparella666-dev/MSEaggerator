import React from 'react';
import { TrendingUp, Factory, DollarSign, AlertTriangle, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const KPICard = ({ title, value, change, icon: Icon, unit = '' }) => {
    const isPositive = change > 0;

    return (
        <div className="card" style={{ padding: '20px' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8125rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{title}</p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '8px' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                    {unit}{value.toLocaleString()}
                </h3>
                <span style={{
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    color: isPositive ? '#007600' : '#b12704'
                }}>
                    {isPositive ? '+' : ''}{change}%
                </span>
            </div>
            <div style={{ marginTop: '12px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Compared to last month
            </div>
        </div>
    );
};

const KPISection = ({ data }) => {
    if (!data) return null;

    return (
        <div className="kpi-grid">
            <KPICard
                title="Demand"
                value={data.demand.value}
                change={data.demand.change}
                icon={TrendingUp}
            />
            <KPICard
                title="Production"
                value={data.production.value}
                change={data.production.change}
                icon={Factory}
            />
            <KPICard
                title="Estimated Profit"
                value={data.profit.value}
                change={data.profit.change}
                icon={DollarSign}
                unit="$"
            />
            <KPICard
                title="Risk Level"
                value={data.risk.value}
                change={data.risk.change}
                icon={AlertTriangle}
                unit=""
            />
        </div>
    );
};

export default KPISection;
