import React, { useState } from 'react';
import { ArrowLeft, ShieldCheck, Lock, AlertTriangle, Mail, Eye, EyeOff, Shield, XCircle, CheckCircle } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Placeholder logic
      console.log('Admin login with', email);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Assume success and set fake user role
      localStorage.setItem('user', JSON.stringify({ email, role: 'admin' }));
      navigate('/admin');
    } catch (err) {
      alert(err.message || 'Error occurred');
    } finally {
      setLoading(false);
    }
  };

  const showForgotNotice = (e) => {
    e.preventDefault();
    alert('Please contact IT Support to reset your admin password.');
  };

  return (
    <div className="admin-login-page" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '30px', position: 'relative', overflow: 'hidden', backgroundColor: 'var(--bg-dark)' }}>
      {/* Basic animated orbs using CSS from style.css */}
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>

      <div className="admin-card" style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '480px', background: 'rgba(20, 12, 40, 0.75)', backdropFilter: 'blur(24px)', border: '1px solid rgba(139, 92, 246, 0.25)', borderRadius: '28px', padding: '50px 48px', boxShadow: '0 32px 80px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(139, 92, 246, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)' }}>
        <Link to="/login" className="back-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600, marginBottom: '36px', opacity: 0.7 }}>
          <ArrowLeft size={16} /> Back to Main Portal
        </Link>
        
        <div className="shield-wrapper" style={{ width: '72px', height: '72px', background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(99, 102, 241, 0.2))', border: '1px solid rgba(139, 92, 246, 0.4)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '28px' }}>
          <ShieldCheck size={34} color="#c4b5fd" />
        </div>

        <div className="admin-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(139, 92, 246, 0.15)', color: '#c4b5fd', padding: '4px 12px', borderRadius: '100px', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', border: '1px solid rgba(139, 92, 246, 0.3)', marginBottom: '16px' }}>
          <Lock size={12} /> Authorized Personnel Only
        </div>

        <h1 style={{ fontSize: '2rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '10px', background: 'linear-gradient(135deg, #fff 0%, #c4b5fd 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Admin Secure<br/>Access
        </h1>
        <p className="subtitle" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '36px' }}>
          This portal is restricted to hostel wardens and system administrators. All access attempts are logged.
        </p>

        <div className="divider" style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(139, 92, 246, 0.3), transparent)', marginBottom: '30px' }}></div>

        <div className="security-note" style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', background: 'rgba(239, 68, 68, 0.07)', border: '1px solid rgba(239, 68, 68, 0.15)', borderRadius: '12px', padding: '12px 14px', marginBottom: '24px' }}>
          <AlertTriangle size={16} color="#f87171" style={{ flexShrink: 0, marginTop: '1px' }} />
          <p style={{ fontSize: '0.78rem', color: '#fca5a5', lineHeight: 1.4, margin: 0 }}>
            Unauthorized access attempts are monitored and will be reported to the IT security team.
          </p>
        </div>

        <form className="admin-form" onSubmit={handleAdminLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="input-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#a78bfa', letterSpacing: '0.5px' }}>Admin Email Address</label>
            <div className="input-wrapper" style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#7c3aed' }} />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@nexhostel.com" required style={{ width: '100%', height: '54px', paddingLeft: '45px', background: 'rgba(139, 92, 246, 0.06)', border: '1px solid rgba(139, 92, 246, 0.2)', borderRadius: '14px', color: 'white', outline: 'none' }} />
            </div>
          </div>

          <div className="input-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div className="label-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#a78bfa', letterSpacing: '0.5px' }}>Password</label>
              <a href="#" className="forgot-link" onClick={showForgotNotice} style={{ fontSize: '0.78rem', color: '#8b5cf6', textDecoration: 'none', fontWeight: 600 }}>Forgot password?</a>
            </div>
            <div className="input-wrapper" style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#7c3aed' }} />
              <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••••" required style={{ width: '100%', height: '54px', paddingLeft: '45px', paddingRight: '45px', background: 'rgba(139, 92, 246, 0.06)', border: '1px solid rgba(139, 92, 246, 0.2)', borderRadius: '14px', color: 'white', outline: 'none' }} />
              <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} className="admin-submit-btn" style={{ width: '100%', height: '54px', background: 'linear-gradient(135deg, #7c3aed, #6366f1)', color: 'white', border: 'none', borderRadius: '14px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '6px' }}>
            <span>{loading ? 'Verifying...' : 'Access Admin Panel'}</span>
            {!loading && <Shield size={18} />}
          </button>
        </form>

        <div className="admin-card-footer" style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
          <a href="#" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textDecoration: 'none' }}>Security Policy</a>
          <span className="footer-dot" style={{ width: '3px', height: '3px', background: 'rgba(255, 255, 255, 0.15)', borderRadius: '50%' }}></span>
          <a href="#" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textDecoration: 'none' }}>Privacy Notice</a>
          <span className="footer-dot" style={{ width: '3px', height: '3px', background: 'rgba(255, 255, 255, 0.15)', borderRadius: '50%' }}></span>
          <a href="mailto:it@nexhostel.com" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textDecoration: 'none' }}>IT Support</a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
