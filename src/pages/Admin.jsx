import React, { useEffect, useState } from 'react';
import { 
  LayoutDashboard, Users, Home, Wrench, CreditCard, BarChart3, 
  Search, Plus, TrendingUp, PieChart, AlertCircle, DollarSign, 
  MoreVertical, Edit3, Check, LogOut 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [adminUser, setAdminUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
    } else {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.role !== 'admin') {
        // optionally navigate('/login') or redirect to unauthorized
        navigate('/login');
      } else {
        setAdminUser(parsedUser);
      }
    }
  }, [navigate]);

  if (!adminUser) return null;

  const adminName = adminUser.name || (adminUser.email ? adminUser.email.split('@')[0] : 'Admin');
  
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="admin-body" style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-dark)', color: 'var(--text-main)' }}>
      {/* Sidebar Styling */}
      <div className="sidebar" style={{ width: '280px', background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(20px)', borderRight: '1px solid var(--surface-border)', display: 'flex', flexDirection: 'column', padding: '30px 20px', position: 'sticky', top: 0, height: '100vh' }}>
        <div className="logo-area" style={{ marginBottom: '40px', paddingLeft: '10px' }}>
          <h2 className="gradient-text" style={{ fontSize: '1.8rem', marginBottom: '4px' }}>NexAdmin</h2>
          <p style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>Master Control</p>
        </div>

        <nav>
          <div className="nav-group" style={{ marginBottom: '30px' }}>
            <label style={{ display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', marginBottom: '15px', paddingLeft: '10px' }}>Main Menu</label>
            <a href="#" className="nav-item active" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 15px', textDecoration: 'none', borderRadius: '12px', marginBottom: '5px', color: 'var(--primary)', background: 'rgba(99, 102, 241, 0.1)' }}><LayoutDashboard size={18} /> Overview</a>
            <a href="#" className="nav-item" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 15px', color: 'var(--text-muted)', textDecoration: 'none', borderRadius: '12px', marginBottom: '5px' }}><Users size={18} /> Residents</a>
            <a href="#" className="nav-item" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 15px', color: 'var(--text-muted)', textDecoration: 'none', borderRadius: '12px', marginBottom: '5px' }}><Home size={18} /> Rooms</a>
          </div>

          <div className="nav-group" style={{ marginBottom: '30px' }}>
            <label style={{ display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', marginBottom: '15px', paddingLeft: '10px' }}>Operations</label>
            <a href="#" className="nav-item" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 15px', color: 'var(--text-muted)', textDecoration: 'none', borderRadius: '12px', marginBottom: '5px' }}>
              <Wrench size={18} /> Maintenance <span className="badge danger" style={{ marginLeft: 'auto', fontSize: '0.7rem', padding: '2px 8px', borderRadius: '20px', background: 'var(--danger)', color: 'white' }}>12</span>
            </a>
            <a href="#" className="nav-item" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 15px', color: 'var(--text-muted)', textDecoration: 'none', borderRadius: '12px', marginBottom: '5px' }}><CreditCard size={18} /> Payments</a>
            <a href="#" className="nav-item" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 15px', color: 'var(--text-muted)', textDecoration: 'none', borderRadius: '12px', marginBottom: '5px' }}><BarChart3 size={18} /> Reports</a>
          </div>
        </nav>

        <div className="sidebar-footer" style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid var(--surface-border)' }}>
          <div className="admin-profile" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="avatar" style={{ width: '44px', height: '44px', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: 'white' }}>
              {adminName.charAt(0).toUpperCase()}
            </div>
            <div className="info">
              <h4 style={{ fontSize: '0.95rem', margin: 0, marginBottom: '2px' }}>{adminName}</h4>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Super Warden</span>
            </div>
          </div>
          <button onClick={handleLogout} className="logout-btn" title="Sign out" style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', marginTop: '14px', padding: '10px 15px', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.15)', borderRadius: '12px', color: '#f87171', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </div>

      {/* Main Content Styling */}
      <main className="main-content" style={{ flex: 1, padding: '40px 60px', overflowY: 'auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
          <div className="page-title">
            <h1 style={{ fontSize: '2.2rem', marginBottom: '5px', margin: 0 }}>Dashboard Overview</h1>
            <p style={{ color: 'var(--text-muted)', margin: 0 }}>Monitor your hostel performance in real-time.</p>
          </div>

          <div className="header-actions" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <div className="search-wrapper" style={{ position: 'relative', width: '300px' }}>
              <Search size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input type="text" placeholder="Search data..." style={{ width: '100%', padding: '12px 15px 12px 45px', background: 'var(--glass)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'white', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <button className="btn btn-primary" style={{ padding: '10px 20px', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}><Plus size={18} /> Add Resident</button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '25px', marginBottom: '40px' }}>
          <div className="glass-card stat-card animate-fade-in" style={{ padding: '25px', display: 'flex', gap: '20px', alignItems: 'flex-start', borderRadius: '24px', animationDelay: '0.1s' }}>
            <div className="stat-icon blue" style={{ width: '50px', height: '50px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}><Users size={24} /></div>
            <div className="stat-info" style={{ flex: 1 }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '5px', display: 'block' }}>Total Residents</label>
              <div className="value" style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '8px' }}>248</div>
              <span className="trend up" style={{ fontSize: '0.75rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}><TrendingUp size={14} /> +12% this month</span>
            </div>
          </div>

          <div className="glass-card stat-card animate-fade-in" style={{ padding: '25px', display: 'flex', gap: '20px', alignItems: 'flex-start', borderRadius: '24px', animationDelay: '0.2s' }}>
            <div className="stat-icon purple" style={{ width: '50px', height: '50px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(168, 85, 247, 0.1)', color: '#a855f7' }}><PieChart size={24} /></div>
            <div className="stat-info" style={{ flex: 1 }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '5px', display: 'block' }}>Occupancy</label>
              <div className="value" style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '8px' }}>92%</div>
              <div className="progress-bar" style={{ width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '10px', marginTop: '8px' }}>
                <div className="fill" style={{ height: '100%', background: 'var(--secondary)', borderRadius: '10px', width: '92%' }}></div>
              </div>
            </div>
          </div>

          <div className="glass-card stat-card animate-fade-in" style={{ padding: '25px', display: 'flex', gap: '20px', alignItems: 'flex-start', borderRadius: '24px', animationDelay: '0.3s' }}>
            <div className="stat-icon orange" style={{ width: '50px', height: '50px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(249, 115, 22, 0.1)', color: '#f97316' }}><AlertCircle size={24} /></div>
            <div className="stat-info" style={{ flex: 1 }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '5px', display: 'block' }}>Complaints</label>
              <div className="value danger-text" style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '8px', color: 'var(--danger)' }}>12</div>
              <span className="trend" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>8 urgent pending</span>
            </div>
          </div>

          <div className="glass-card stat-card animate-fade-in" style={{ padding: '25px', display: 'flex', gap: '20px', alignItems: 'flex-start', borderRadius: '24px', animationDelay: '0.4s' }}>
            <div className="stat-icon green" style={{ width: '50px', height: '50px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}><DollarSign size={24} /></div>
            <div className="stat-info" style={{ flex: 1 }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '5px', display: 'block' }}>Revenue</label>
              <div className="value" style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '8px' }}>$42.5k</div>
              <span className="trend up" style={{ fontSize: '0.75rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}><TrendingUp size={14} /> +5.2k</span>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="content-grid" style={{ display: 'grid', gridTemplateColumns: '2.2fr 1fr', gap: '25px' }}>
          <div className="glass-card table-card animate-fade-in" style={{ padding: '30px', borderRadius: '24px', animationDelay: '0.5s' }}>
            <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <h3 style={{ margin: 0 }}>Recent Resident Activity</h3>
              <div className="card-actions" style={{ display: 'flex', alignItems: 'center' }}>
                <select className="filter-select" style={{ background: 'var(--glass)', border: '1px solid var(--glass-border)', color: 'white', padding: '8px 12px', borderRadius: '10px', marginRight: '10px', outline: 'none' }}>
                  <option>All Rooms</option>
                  <option>Block A</option>
                  <option>Block B</option>
                </select>
                <button className="icon-btn" style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}><MoreVertical size={20} /></button>
              </div>
            </div>
            <div className="table-container" style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '15px', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', borderBottom: '1px solid var(--surface-border)' }}>Student</th>
                    <th style={{ textAlign: 'left', padding: '15px', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', borderBottom: '1px solid var(--surface-border)' }}>Room</th>
                    <th style={{ textAlign: 'left', padding: '15px', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', borderBottom: '1px solid var(--surface-border)' }}>Department</th>
                    <th style={{ textAlign: 'left', padding: '15px', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', borderBottom: '1px solid var(--surface-border)' }}>Status</th>
                    <th style={{ textAlign: 'left', padding: '15px', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', borderBottom: '1px solid var(--surface-border)' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: '18px 15px', borderBottom: '1px solid var(--surface-border)' }}>
                      <div className="user-cell" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div className="mini-avatar" style={{ width: '32px', height: '32px', background: 'var(--glass)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700 }}>RS</div>
                        <div>
                          <div className="name" style={{ fontWeight: 600, fontSize: '0.95rem' }}>Rahul Sharma</div>
                          <div className="sub" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>rahul@example.com</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '18px 15px', borderBottom: '1px solid var(--surface-border)' }}>102-A</td>
                    <td style={{ padding: '18px 15px', borderBottom: '1px solid var(--surface-border)' }}>Computer Science</td>
                    <td style={{ padding: '18px 15px', borderBottom: '1px solid var(--surface-border)' }}><span className="tag success" style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 700, background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>Active</span></td>
                    <td style={{ padding: '18px 15px', borderBottom: '1px solid var(--surface-border)' }}><button className="btn-text" style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><Edit3 size={18} /></button></td>
                  </tr>
                  <tr>
                    <td style={{ padding: '18px 15px', borderBottom: '1px solid var(--surface-border)' }}>
                      <div className="user-cell" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div className="mini-avatar" style={{ width: '32px', height: '32px', background: 'var(--glass)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700 }}>AV</div>
                        <div>
                          <div className="name" style={{ fontWeight: 600, fontSize: '0.95rem' }}>Aditi Verma</div>
                          <div className="sub" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>aditi@example.com</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '18px 15px', borderBottom: '1px solid var(--surface-border)' }}>305-B</td>
                    <td style={{ padding: '18px 15px', borderBottom: '1px solid var(--surface-border)' }}>Electronics</td>
                    <td style={{ padding: '18px 15px', borderBottom: '1px solid var(--surface-border)' }}><span className="tag success" style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 700, background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>Active</span></td>
                    <td style={{ padding: '18px 15px', borderBottom: '1px solid var(--surface-border)' }}><button className="btn-text" style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><Edit3 size={18} /></button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="glass-card secondary-card animate-fade-in" style={{ padding: '30px', borderRadius: '24px', animationDelay: '0.6s' }}>
            <h3 style={{ margin: '0 0 20px 0' }}>Quick Tasks</h3>
            <div className="task-list" style={{ marginBottom: '25px' }}>
              <div className="task-item" style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '15px', padding: '12px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.02)' }}>
                <div className="task-check" style={{ width: '20px', height: '20px', border: '1px solid var(--glass-border)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--primary)' }}><Check size={14} /></div>
                <p style={{ margin: 0, fontSize: '0.85rem' }}>Verify Room 104 electricity fault</p>
              </div>
              <div className="task-item" style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '15px', padding: '12px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.02)' }}>
                <div className="task-check" style={{ width: '20px', height: '20px', border: '1px solid var(--glass-border)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}></div>
                <p style={{ margin: 0, fontSize: '0.85rem' }}>Send fee reminders for March</p>
              </div>
              <div className="task-item" style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '15px', padding: '12px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.02)' }}>
                <div className="task-check" style={{ width: '20px', height: '20px', border: '1px solid var(--glass-border)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}></div>
                <p style={{ margin: 0, fontSize: '0.85rem' }}>Approve 3 new admissions</p>
              </div>
            </div>
            <button className="btn btn-ghost full-width" style={{ background: 'transparent', border: '1px solid var(--surface-border)', color: 'var(--text-muted)', width: '100%', padding: '10px', borderRadius: '12px', cursor: 'pointer' }}>View All Tasks</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
