const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// Database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: 'hostel_db'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL Database');
});

// --- AUTH ROUTES ---

app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, results) => {
        if (err) return res.status(500).json(err);
        if (results.length > 0) {
            res.json({ message: 'Login successful', user: results[0] });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    });
});

// --- STUDENT DASHBOARD ROUTES ---

// Get student details with room info
app.get('/api/students/:userId', (req, res) => {
    const query = `
        SELECT s.*, r.room_number, r.type as room_type 
        FROM students s 
        LEFT JOIN rooms r ON s.room_id = r.id 
        WHERE s.user_id = ?`;
    db.query(query, [req.params.userId], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results[0]);
    });
});

// Submit a complaint
app.post('/api/complaints', (req, res) => {
    const { student_id, title, category, description } = req.body;
    const query = 'INSERT INTO complaints (student_id, title, category, description) VALUES (?, ?, ?, ?)';
    db.query(query, [student_id, title, category, description], (err, results) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ message: 'Complaint filed', id: results.insertId });
    });
});

// --- ADMIN ROUTES ---

// Get all complaints for admin
app.get('/api/admin/complaints', (req, res) => {
    const query = `
        SELECT c.*, s.roll_no, r.room_number 
        FROM complaints c
        JOIN students s ON c.student_id = s.id
        JOIN rooms r ON s.room_id = r.id
        ORDER BY c.created_at DESC`;
    db.query(query, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// Update complaint status
app.put('/api/admin/complaints/:id', (req, res) => {
    const { status, assigned_staff } = req.body;
    const query = 'UPDATE complaints SET status = ?, assigned_staff = ? WHERE id = ?';
    db.query(query, [status, assigned_staff, req.params.id], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Status updated' });
    });
});

// Occupancy Report
app.get('/api/admin/reports/occupancy', (req, res) => {
    const query = 'SELECT room_number, capacity, current_occupancy, status FROM rooms';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
