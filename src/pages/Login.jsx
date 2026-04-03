import React, { useState } from 'react';
import { User, Lock, Shield, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase.js';
import bgImage from '../assets/bg.png';

const Login = () => {
  const [currentMode, setCurrentMode] = useState('login');
  const [portal, setPortal] = useState('student');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handlePortalSwitch = (newPortal) => {
    setPortal(newPortal);
    if (newPortal === 'admin') {
      setCurrentMode('login');
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      setSuccessMsg('');
      if (currentMode === 'login') {
        const table = portal === 'admin' ? 'admin' : 'student';
        const field = portal === 'admin' ? 'email' : 'email'; // assuming both use email now

        // Assuming username state holds the email for students
        const { data, error } = await supabase
          .from(table)
          .select('*')
          .eq(field, username)
          .eq('password', password)
          .maybeSingle();

        if (error) throw error;
        
        if (!data) {
          alert('Invalid credentials!');
          setLoading(false);
          return;
        }

        localStorage.setItem('user', JSON.stringify({ ...data, role: portal }));
        navigate(portal === 'admin' ? '/admin' : '/dashboard');
      } else {
        const table = role === 'admin' ? 'admin' : 'student';
        
        const newRecord = table === 'student' ? {
            email: username,
            name: username.split('@')[0], 
            password: password,
            phone: 'Not provided',
            dept: 'Unassigned',
            year: '1'
        } : {
            email: username,
            name: username.split('@')[0],
            password: password
        };
        
        // Insert into the database
        const { error } = await supabase
          .from(table)
          .insert([newRecord]);
          
        if (error) {
          alert('Registration failed: ' + error.message);
          setLoading(false);
          return;
        }
        
        // Show success and switch back to login
        setSuccessMsg('Account successfully created! Please log in below.');
        setCurrentMode('login');
        setPassword('');
        setLoading(false);
      }
    } catch (err) {
      alert('Error connecting to backend: ' + err.message);
      setLoading(false);
    }
  };

  return (
    <div className="login-container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '15px', boxSizing: 'border-box', backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
      {/* Dark overlay for contrast */}
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.55)', zIndex: 1 }}></div>

      {/* Center Console */}
      <div className="glass-card form-section" style={{ position: 'relative', zIndex: 2, flex: 1, maxWidth: '500px', width: '100%', padding: '30px 40px', borderRadius: '24px', background: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.1)', boxShadow: '0 50px 100px -20px rgba(0, 0, 0, 0.8)', display: 'flex', flexDirection: 'column' }}>
        
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div className="brand-badge" style={{ display: 'inline-block', background: 'rgba(99, 102, 241, 0.2)', color: '#818cf8', padding: '4px 10px', borderRadius: '100px', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>
            Premium Management
          </div>
          <p style={{ fontSize: '0.9rem', color: '#94a3b8', margin: 0 }}>
            Experience the future of student living.
          </p>
        </div>

        <div className="portal-toggle" style={{ display: 'flex', background: 'rgba(15, 23, 42, 0.5)', padding: '5px', borderRadius: '14px', marginBottom: '20px' }}>
          <button
            className={`portal-btn ${portal === 'student' ? 'active' : ''}`}
            onClick={() => handlePortalSwitch('student')}
            style={{ flex: 1, padding: '10px', border: 'none', background: portal === 'student' ? '#6366f1' : 'transparent', color: portal === 'student' ? 'white' : '#94a3b8', borderRadius: '10px', cursor: 'pointer', fontWeight: 700, fontSize: '0.9rem' }}
          >
            Student Portal
          </button>
          <button
            className={`portal-btn ${portal === 'admin' ? 'active' : ''}`}
            onClick={() => navigate('/admin-login')}
            style={{ flex: 1, padding: '10px', border: 'none', background: portal === 'admin' ? '#6366f1' : 'transparent', color: portal === 'admin' ? 'white' : '#94a3b8', borderRadius: '10px', cursor: 'pointer', fontWeight: 700, fontSize: '0.9rem' }}
          >
            Admin Access
          </button>
        </div>

        <div className="form-header" style={{ marginBottom: '15px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '5px', color: '#fff' }}>
            {portal === 'admin' ? 'Warden Security' : 'Welcome Back'}
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
            {currentMode === 'register' ? 'Join our community today.' : 'Enter your credentials to access your dashboard.'}
          </p>
        </div>

        {successMsg && (
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '10px', borderRadius: '10px', marginBottom: '15px', textAlign: 'center', fontSize: '0.85rem', fontWeight: 600 }}>
            {successMsg}
          </div>
        )}

        {portal === 'student' && (
          <div className="auth-tabs-container" style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <button
              className={`tab-btn ${currentMode === 'login' ? 'active' : ''}`}
              onClick={() => setCurrentMode('login')}
              style={{ flex: 1, padding: '8px', background: 'transparent', border: 'none', borderBottom: currentMode === 'login' ? '2px solid #6366f1' : '2px solid transparent', color: currentMode === 'login' ? 'white' : '#94a3b8', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem' }}
            >
              Sign In
            </button>
            <button
              className={`tab-btn ${currentMode === 'register' ? 'active' : ''}`}
              onClick={() => setCurrentMode('register')}
              style={{ flex: 1, padding: '8px', background: 'transparent', border: 'none', borderBottom: currentMode === 'register' ? '2px solid #6366f1' : '2px solid transparent', color: currentMode === 'register' ? 'white' : '#94a3b8', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem' }}
            >
              New Account
            </button>
          </div>
        )}

        <form id="auth-form" className="auth-form" autoComplete="off" onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div className="input-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label htmlFor="username" style={{ color: '#e2e8f0', fontSize: '0.85rem', fontWeight: 500 }}>Username</label>
            <div className="input-wrapper" style={{ position: 'relative' }}>
              <User size={16} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                type="text"
                id="username"
                autoComplete="off"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. johndoe"
                required
                style={{ width: '100%', height: '46px', paddingLeft: '40px', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', outline: 'none', fontSize: '0.9rem', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          <div className="input-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div className="label-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label htmlFor="password" style={{ color: '#e2e8f0', fontSize: '0.85rem', fontWeight: 500 }}>Password</label>
              <a href="#" className="forgot-link" style={{ fontSize: '0.75rem', color: '#6366f1', textDecoration: 'none' }}>Forgot?</a>
            </div>
            <div className="input-wrapper" style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{ width: '100%', height: '46px', paddingLeft: '40px', paddingRight: '45px', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', outline: 'none', fontSize: '0.9rem', boxSizing: 'border-box' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0, display: 'flex' }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {currentMode === 'register' && portal === 'student' && (
            <div className="input-group animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label htmlFor="role" style={{ color: '#e2e8f0', fontSize: '0.85rem', fontWeight: 500 }}>Requested Role</label>
              <div className="input-wrapper" style={{ position: 'relative' }}>
                <Shield size={16} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  style={{ width: '100%', height: '46px', paddingLeft: '40px', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', outline: 'none', appearance: 'none', fontSize: '0.9rem', boxSizing: 'border-box' }}
                >
                  <option value="student">Student/Resident</option>
                  <option value="admin">Warden/Admin</option>
                </select>
              </div>
            </div>
          )}

          <button type="submit" className="btn btn-primary login-btn" disabled={loading} style={{ width: '100%', height: '48px', marginTop: '5px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', fontWeight: 600, fontSize: '0.95rem' }}>
            <span>{loading ? 'Processing...' : currentMode === 'register' ? 'Create Account' : 'Access Dashboard'}</span>
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        <div className="form-footer" style={{ marginTop: 'auto', paddingTop: '20px' }}>
          {portal === 'student' ? (
            <p style={{ color: '#94a3b8', textAlign: 'center', fontSize: '0.8rem', margin: 0 }}>
              Need assistance logging in? <a href="#" className="primary-link" style={{ color: '#6366f1', textDecoration: 'none', fontWeight: 600 }}>Contact Support</a>
            </p>
          ) : (
            <p style={{ color: '#94a3b8', textAlign: 'center', fontSize: '0.8rem', margin: 0 }}>
              Warden forgot password? <a href="#" className="primary-link" style={{ color: '#6366f1', textDecoration: 'none', fontWeight: 600 }}>Contact IT Support</a>
            </p>
          )}
          <div className="footer-bottom" style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px' }}>
            <a href="#" style={{ fontSize: '0.7rem', color: '#64748b', textDecoration: 'none' }}>Security</a>
            <span className="dot" style={{ width: '3px', height: '3px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '50%' }}></span>
            <a href="#" style={{ fontSize: '0.7rem', color: '#64748b', textDecoration: 'none' }}>Privacy</a>
            <span className="dot" style={{ width: '3px', height: '3px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '50%' }}></span>
            <a href="#" style={{ fontSize: '0.7rem', color: '#64748b', textDecoration: 'none' }}>Help</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
