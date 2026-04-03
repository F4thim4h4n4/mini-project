import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Home, CreditCard, AlertCircle, Settings, LogOut, 
  Search, Bell, Wrench, Wifi, Megaphone, Clock 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Assuming supabase is globally available or imported if needed later
// For now, we mimic the logic structure used in the HTML

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  if (!user) return null; // or a loading spinner

  const displayName = user.name || 'Student';

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleComplaintSubmit = (e) => {
    e.preventDefault();
    // placeholder for supabase logic
    alert('Complaint submitted!');
    setIsModalOpen(false);
  };

  return (
    <div className="dashboard-body" style={{ display: 'flex', backgroundColor: 'var(--bg-dark)' }}>
      {/* Sidebar */}
      <div className="sidebar" style={{ width: '280px', height: '100vh', background: 'var(--surface)', backdropFilter: 'blur(20px)', borderRight: '1px solid var(--surface-border)', padding: '30px', display: 'flex', flexDirection: 'column', position: 'sticky', top: 0 }}>
        <div className="logo" style={{ marginBottom: '50px' }}>
          <h2 className="gradient-text" style={{ fontSize: '1.8rem' }}>NexHostel</h2>
        </div>
        <nav style={{ flex: 1 }}>
          <a href="#" className={`nav-item ${activeSection === 'overview' ? 'active' : ''}`} onClick={(e) => {e.preventDefault(); setActiveSection('overview');}}>
            <LayoutDashboard size={20} /> Dashboard
          </a>
          <a href="#" className={`nav-item ${activeSection === 'room' ? 'active' : ''}`} onClick={(e) => {e.preventDefault(); setActiveSection('room');}}>
            <Home size={20} /> My Room
          </a>
          <a href="#" className={`nav-item ${activeSection === 'fees' ? 'active' : ''}`} onClick={(e) => {e.preventDefault(); setActiveSection('fees');}}>
            <CreditCard size={20} /> Fees & Payments
          </a>
          <a href="#" className={`nav-item ${activeSection === 'complaints' ? 'active' : ''}`} onClick={(e) => {e.preventDefault(); setActiveSection('complaints');}}>
            <AlertCircle size={20} /> Complaints
          </a>
          <a href="#" className="nav-item">
            <Settings size={20} /> Settings
          </a>
        </nav>
        <div className="user-profile" style={{ paddingTop: '20px', borderTop: '1px solid var(--surface-border)', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="avatar" style={{ width: '40px', height: '40px', background: 'var(--primary)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
            {displayName.charAt(0).toUpperCase()}
          </div>
          <div className="user-info" style={{ flex: 1 }}>
            <h4 style={{ fontSize: '0.95rem', margin: 0 }}>{displayName}</h4>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Room 402</span>
          </div>
          <a href="#" className="logout-btn" onClick={handleLogout} style={{ color: 'var(--text-muted)' }}>
            <LogOut size={20} />
          </a>
        </div>
      </div>

      {/* Main Content */}
      <main className="main-content" style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        <header style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
          <div className="search-bar" style={{ background: 'var(--glass)', padding: '10px 20px', borderRadius: '30px', display: 'flex', alignItems: 'center', gap: '10px', width: '400px', border: '1px solid var(--glass-border)' }}>
            <Search size={18} style={{ color: 'var(--text-muted)' }}/>
            <input type="text" placeholder="Search facilities, staff..." style={{ background: 'transparent', border: 'none', color: 'white', outline: 'none', width: '100%' }} />
          </div>
          <div className="header-actions">
            <button className="icon-btn" style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', position: 'relative' }}>
              <Bell size={20} />
              <span className="badge" style={{ position: 'absolute', top: -2, right: -2, background: 'var(--danger)', width: 8, height: 8, borderRadius: '50%'}}></span>
            </button>
          </div>
        </header>

        {activeSection === 'overview' && (
          <section id="overview" className="content-section">
            <div className="welcome-banner glass-card" style={{ padding: '40px', marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.1))', borderRadius: '24px' }}>
              <div>
                <h1 style={{ margin: 0, fontSize: '2rem' }}>Welcome back, {displayName.split(' ')[0]}! 👋</h1>
                <p style={{ margin: '10px 0 0', color: 'var(--text-muted)' }}>Your next fee payment is due in 5 days.</p>
              </div>
              <button className="btn btn-primary" style={{ padding: '12px 24px', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 600, cursor: 'pointer' }}>Pay Fees</button>
            </div>

            <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px' }}>
              <div className="glass-card stat-card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px', borderRadius: '24px', cursor: 'pointer' }}>
                <div className="stat-img-wrapper" style={{ width: '60px', height: '60px', borderRadius: '16px', overflow: 'hidden', flexShrink: 0, border: '2px solid var(--surface-border)' }}>
                  <img src="https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=200&h=200&auto=format&fit=crop" alt="Room" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="stat-inner">
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Current Room</label>
                  <h3 style={{ margin: 0 }}>402-B (Triple)</h3>
                </div>
              </div>
              <div className="glass-card stat-card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px', borderRadius: '24px', cursor: 'pointer' }}>
                <div className="stat-img-wrapper" style={{ width: '60px', height: '60px', borderRadius: '16px', overflow: 'hidden', flexShrink: 0, border: '2px solid var(--surface-border)' }}>
                  <img src="https://images.unsplash.com/photo-1580519542036-c47de6196ba5?q=80&w=200&h=200&auto=format&fit=crop" alt="Fees" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="stat-inner">
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Fees Status</label>
                  <h3 className="success-text" style={{ margin: 0, color: 'var(--success)' }}>Paid (Jan)</h3>
                </div>
              </div>
              <div className="glass-card stat-card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px', borderRadius: '24px', cursor: 'pointer' }}>
                <div className="stat-img-wrapper" style={{ width: '60px', height: '60px', borderRadius: '16px', overflow: 'hidden', flexShrink: 0, border: '2px solid var(--surface-border)' }}>
                  <img src="https://images.unsplash.com/photo-1560264280-88b68371db39?q=80&w=200&h=200&auto=format&fit=crop" alt="Complaints" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="stat-inner">
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Active Complaints</label>
                  <h3 style={{ margin: 0 }}>2 Pending</h3>
                </div>
              </div>
            </div>

            <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px', alignItems: 'start' }}>
              <div className="glass-card table-card" style={{ padding: '30px', borderRadius: '24px' }}>
                <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div className="header-main" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <h3 style={{ margin: 0 }}>Recent Complaints</h3>
                    <span className="header-badge" style={{ fontSize: '0.65rem', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', padding: '4px 10px', borderRadius: '20px', fontWeight: 700, textTransform: 'uppercase' }}>Latest Updates</span>
                  </div>
                  <button className="btn btn-ghost" onClick={() => setActiveSection('complaints')} style={{ background: 'transparent', border: '1px solid var(--surface-border)', color: 'var(--text-muted)', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer' }}>View History</button>
                </div>
                <div className="table-frame" style={{ overflowX: 'auto', marginTop: '10px' }}>
                  <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px' }}>
                    <thead>
                      <tr>
                        <th style={{ textAlign: 'left', padding: '12px 20px', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 700 }}>Title & Reference</th>
                        <th style={{ textAlign: 'left', padding: '12px 20px', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 700 }}>Category</th>
                        <th style={{ textAlign: 'left', padding: '12px 20px', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 700 }}>Status</th>
                        <th style={{ textAlign: 'left', padding: '12px 20px', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 700 }}>Activity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ padding: '16px 20px', background: 'rgba(255,255,255,0.015)', borderTop: '1px solid rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.03)', borderLeft: '1px solid rgba(255,255,255,0.03)', borderRadius: '12px 0 0 12px' }}>
                          <div className="complaint-cell" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <div className="complaint-icon maintenance" style={{ width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(239, 68, 68, 0.1)', color: '#f87171' }}><Wrench size={18} /></div>
                            <div>
                              <div className="title" style={{ fontWeight: 600, fontSize: '0.95rem' }}>AC Leakage - Room 402</div>
                              <div className="ref" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>#CMP-7821</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '16px 20px', background: 'rgba(255,255,255,0.015)', borderTop: '1px solid rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.03)' }}><span className="cat-pill" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.05)', padding: '4px 10px', borderRadius: '6px' }}>Maintenance</span></td>
                        <td style={{ padding: '16px 20px', background: 'rgba(255,255,255,0.015)', borderTop: '1px solid rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.03)' }}><span className="status-pill in-progress" style={{ fontSize: '0.75rem', fontWeight: 700, padding: '5px 12px', borderRadius: '20px', textTransform: 'uppercase', background: 'rgba(245, 158, 11, 0.1)', color: '#fbbf24', border: '1px solid rgba(245, 158, 11, 0.2)' }}>In Progress</span></td>
                        <td style={{ padding: '16px 20px', background: 'rgba(255,255,255,0.015)', borderTop: '1px solid rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.03)', borderRight: '1px solid rgba(255,255,255,0.03)', borderRadius: '0 12px 12px 0' }}><span className="date-text" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Today, 09:45 AM</span></td>
                      </tr>
                      <tr>
                        <td style={{ padding: '16px 20px', background: 'rgba(255,255,255,0.015)', borderTop: '1px solid rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.03)', borderLeft: '1px solid rgba(255,255,255,0.03)', borderRadius: '12px 0 0 12px' }}>
                          <div className="complaint-cell" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <div className="complaint-icon wifi" style={{ width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa' }}><Wifi size={18} /></div>
                            <div>
                              <div className="title" style={{ fontWeight: 600, fontSize: '0.95rem' }}>WiFi Intermittent Lag</div>
                              <div className="ref" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>#CMP-7798</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '16px 20px', background: 'rgba(255,255,255,0.015)', borderTop: '1px solid rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.03)' }}><span className="cat-pill" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.05)', padding: '4px 10px', borderRadius: '6px' }}>IT Support</span></td>
                        <td style={{ padding: '16px 20px', background: 'rgba(255,255,255,0.015)', borderTop: '1px solid rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.03)' }}><span className="status-pill resolved" style={{ fontSize: '0.75rem', fontWeight: 700, padding: '5px 12px', borderRadius: '20px', textTransform: 'uppercase', background: 'rgba(16, 185, 129, 0.1)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.2)' }}>Resolved</span></td>
                        <td style={{ padding: '16px 20px', background: 'rgba(255,255,255,0.015)', borderTop: '1px solid rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.03)', borderRight: '1px solid rgba(255,255,255,0.03)', borderRadius: '0 12px 12px 0' }}><span className="date-text" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Feb 05, 2024</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="glass-card events-card" style={{ padding: '30px', display: 'flex', flexDirection: 'column', borderRadius: '24px' }}>
                <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                  <h3 style={{ margin: 0 }}>Hostel Announcements</h3>
                  <Megaphone className="header-icon" size={20} style={{ color: 'var(--secondary)', opacity: 0.8 }} />
                </div>
                <div className="event-list" style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '20px' }}>
                  <div className="event-item" style={{ display: 'flex', gap: '18px', padding: '18px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.03)', borderRadius: '18px', position: 'relative' }}>
                    <div className="event-indicator urgent" style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: '4px', height: '40%', borderRadius: '0 4px 4px 0', background: 'var(--danger)', boxShadow: '0 0 10px var(--danger)' }}></div>
                    <div className="event-date" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '55px', height: '55px', background: 'var(--glass)', borderRadius: '14px', border: '1px solid var(--glass-border)' }}>
                      <span className="day" style={{ fontSize: '1.2rem', fontWeight: 800, lineHeight: 1 }}>10</span>
                      <span className="month" style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>FEB</span>
                    </div>
                    <div className="event-details">
                      <div className="event-meta" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <span className="category maintenance" style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', padding: '2px 8px', borderRadius: '4px', background: 'rgba(239, 68, 68, 0.1)', color: '#f87171' }}>Maintenance</span>
                        <span className="time" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12} /> 10:00 AM</span>
                      </div>
                      <h5 style={{ fontSize: '1rem', margin: '0 0 6px 0', color: 'var(--text-main)' }}>Generator Maintenance</h5>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>Scheduled power maintenance in Block A and B. Plan accordingly.</p>
                    </div>
                  </div>
                </div>
                <button className="btn btn-ghost full-width" style={{ background: 'transparent', border: '1px solid var(--surface-border)', color: 'var(--text-muted)', width: '100%', padding: '10px', borderRadius: '12px', cursor: 'pointer' }}>View Archives</button>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'complaints' && (
          <section id="complaints" className="content-section">
            <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <h1 style={{ margin: 0, fontSize: '2rem' }}>Complaints tracking</h1>
              <button className="btn btn-primary" onClick={() => setIsModalOpen(true)} style={{ padding: '10px 20px', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 600 }}>Log New Complaint</button>
            </div>

            <div className="filters" style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
              <button className="filter-chip active" style={{ padding: '6px 16px', borderRadius: '20px', background: 'var(--primary)', color: 'white', border: 'none', cursor: 'pointer' }}>All</button>
              <button className="filter-chip" style={{ padding: '6px 16px', borderRadius: '20px', background: 'transparent', border: '1px solid var(--surface-border)', color: 'var(--text-muted)', cursor: 'pointer' }}>Pending</button>
              <button className="filter-chip" style={{ padding: '6px 16px', borderRadius: '20px', background: 'transparent', border: '1px solid var(--surface-border)', color: 'var(--text-muted)', cursor: 'pointer' }}>Resolved</button>
            </div>

            <div className="complaints-list" id="complaints-container">
              <p style={{ color: 'var(--text-muted)' }}>Loading complaints...</p>
            </div>
          </section>
        )}
      </main>

      {/* Complaint Modal */}
      {isModalOpen && (
        <div id="complaint-modal" className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="glass-card modal-content" style={{ width: '500px', padding: '40px', borderRadius: '24px' }}>
            <h2 style={{ marginTop: 0, marginBottom: '20px' }}>Log New Complaint</h2>
            <form onSubmit={handleComplaintSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div className="input-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Title</label>
                <input type="text" id="complaint-title" placeholder="e.g. Water shortage" required style={{ padding: '12px', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', outline: 'none' }} />
              </div>
              <div className="input-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Category</label>
                <select id="complaint-category" style={{ padding: '12px', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', outline: 'none' }}>
                  <option>Plumbing</option>
                  <option>Electrical</option>
                  <option>Cleanliness</option>
                  <option>IT/Internet</option>
                </select>
              </div>
              <div className="input-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Description</label>
                <textarea id="complaint-desc" rows="4" style={{ padding: '12px', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', outline: 'none', resize: 'vertical' }}></textarea>
              </div>
              <div className="modal-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px', marginTop: '30px' }}>
                <button type="button" className="btn" onClick={() => setIsModalOpen(false)} style={{ padding: '10px 20px', background: 'transparent', border: '1px solid var(--surface-border)', color: 'white', borderRadius: '12px', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ padding: '10px 20px', background: 'var(--primary)', border: 'none', color: 'white', borderRadius: '12px', cursor: 'pointer', fontWeight: 600 }}>Submit Complaint</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
