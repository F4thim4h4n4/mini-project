import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Admission = () => {
  const [formData, setFormData] = useState({
    name: '',
    roll_no: '',
    phone: '',
    course: '',
    gender: 'Male',
    roomType: 'Single (Premium)',
    address: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const submitAdmission = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Placeholder for supabase insert logic
      const generatedEmail = `${formData.roll_no.toLowerCase()}@nexhostel.com`;
      console.log('Submitting admission:', formData);
      console.log('Generated Email:', generatedEmail);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert(`Application successful! Your login email is ${generatedEmail} and password is "student123"`);
      navigate('/login');
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-body flex-center" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-dark)' }}>
      <div className="glass-card admission-form animate-fade-in" style={{ maxWidth: '800px', width: '100%', padding: '50px', margin: '20px', borderRadius: '32px', border: '1px solid var(--glass-border)', background: 'var(--glass)', backdropFilter: 'blur(20px)' }}>
        <div className="header" style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Hostel Admission</h1>
          <p style={{ color: 'var(--text-muted)' }}>Fill in the details to apply for a room allocation.</p>
        </div>

        <form onSubmit={submitAdmission}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="input-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="John Doe" required style={{ padding: '12px', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', outline: 'none' }} />
            </div>
            <div className="input-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Roll Number / ID</label>
              <input type="text" name="roll_no" value={formData.roll_no} onChange={handleInputChange} placeholder="CS2024001" required style={{ padding: '12px', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', outline: 'none' }} />
            </div>
            <div className="input-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Phone Number</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+91 9876543210" required style={{ padding: '12px', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', outline: 'none' }} />
            </div>
            <div className="input-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Course/Department</label>
              <input type="text" name="course" value={formData.course} onChange={handleInputChange} placeholder="B.Tech Computer Science" required style={{ padding: '12px', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', outline: 'none' }} />
            </div>
            <div className="input-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Gender</label>
              <select name="gender" value={formData.gender} onChange={handleInputChange} style={{ padding: '12px', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', outline: 'none' }}>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div className="input-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Preferred Room Type</label>
              <select name="roomType" value={formData.roomType} onChange={handleInputChange} id="room-type" style={{ padding: '12px', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', outline: 'none' }}>
                <option>Single (Premium)</option>
                <option>Double (Shared)</option>
                <option>Triple (Economy)</option>
              </select>
            </div>
          </div>

          <div className="input-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '20px' }}>
            <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Permanent Address</label>
            <textarea name="address" value={formData.address} onChange={handleInputChange} rows="3" placeholder="Enter your full address..." style={{ padding: '12px', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', outline: 'none', resize: 'vertical' }}></textarea>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px' }}>
            <Link to="/login" style={{ color: 'white', textDecoration: 'none', opacity: 0.8 }}>Back to Login</Link>
            <button type="submit" disabled={loading} className="btn btn-primary" style={{ padding: '12px 24px', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 600 }}>
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Admission;
