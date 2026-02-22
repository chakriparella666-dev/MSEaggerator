import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        // Check for token in URL (from Google Auth redirect)
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        const role = params.get('role');
        const user = params.get('user');

        if (token && role && user) {
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            localStorage.setItem('user', decodeURIComponent(user));
            window.location.href = '/';
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('role', res.data.user.role);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            window.location.href = '/';
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f8fafc'
        }}>
            <div className="card" style={{ width: '400px', padding: '40px' }}>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '8px', textAlign: 'center' }}>Welcome Back</h2>
                <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '32px' }}>Sign in to your account</p>

                {error && <div style={{ backgroundColor: '#fef2f2', color: '#dc2626', padding: '12px', borderRadius: '6px', marginBottom: '20px', fontSize: '0.875rem' }}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '6px' }}>Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border)', outline: 'none' }}
                            placeholder="name@company.com"
                        />
                    </div>
                    <div style={{ marginBottom: '32px' }}>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '6px' }}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border)', outline: 'none' }}
                            placeholder="••••••••"
                        />
                    </div>
                    <button type="submit" style={{
                        width: '100%',
                        padding: '12px',
                        backgroundColor: 'var(--primary)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        marginBottom: '20px'
                    }}>
                        Sign In
                    </button>
                </form>

                <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0', gap: '12px' }}>
                    <div style={{ flex: 1, height: '1px', backgroundColor: '#ddd' }}></div>
                    <span style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase' }}>or</span>
                    <div style={{ flex: 1, height: '1px', backgroundColor: '#ddd' }}></div>
                </div>

                <button
                    onClick={() => window.location.href = 'http://localhost:5000/auth/google'}
                    style={{
                        width: '100%',
                        padding: '12px',
                        backgroundColor: 'white',
                        color: '#111',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        fontWeight: 500,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                        fontSize: '0.925rem'
                    }}
                >
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" style={{ width: '18px', height: '18px' }} />
                    Continue with Google
                </button>

                <p style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                    Don't have an account? <a href="/signup" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>Create an account</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
