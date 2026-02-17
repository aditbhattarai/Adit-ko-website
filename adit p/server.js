require('dotenv').config();
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Initialize SQLite Database
const db = new sqlite3.Database('./portfolio.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database');
        createTables();
    }
});

// Create tables
function createTables() {
    db.run(`
        CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            subject TEXT NOT NULL,
            message TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (err) {
            console.error('Error creating table:', err.message);
        } else {
            console.log('Contacts table ready');
        }
    });

    db.run(`
        CREATE TABLE IF NOT EXISTS visitors (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ip_address TEXT,
            user_agent TEXT,
            page_visited TEXT,
            visited_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (err) {
            console.error('Error creating visitors table:', err.message);
        } else {
            console.log('Visitors table ready');
        }
    });
}

// Email transporter configuration
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Verify email configuration
transporter.verify(function (error, success) {
    if (error) {
        console.log('Email configuration error:', error);
        console.log('Email notifications will not work. Please configure .env file.');
    } else {
        console.log('Email server is ready to send messages');
    }
});

// API Routes

// Submit contact form
app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required'
        });
    }

    const sql = `INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)`;

    db.run(sql, [name, email, subject, message], function (err) {
        if (err) {
            console.error('Error inserting contact:', err.message);
            return res.status(500).json({
                success: false,
                message: 'Error saving contact information'
            });
        }

        // Send email notification
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.RECIPIENT_EMAIL || process.env.EMAIL_USER,
            subject: `New Contact Form Submission: ${subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 10px;">
                    <h2 style="color: #1f2937; border-bottom: 3px solid #3b82f6; padding-bottom: 10px;">New Contact Form Submission</h2>
                    
                    <div style="background-color: white; padding: 20px; border-radius: 8px; margin-top: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                        <p style="margin: 10px 0;"><strong style="color: #374151;">Name:</strong> <span style="color: #6b7280;">${name}</span></p>
                        <p style="margin: 10px 0;"><strong style="color: #374151;">Email:</strong> <span style="color: #6b7280;">${email}</span></p>
                        <p style="margin: 10px 0;"><strong style="color: #374151;">Subject:</strong> <span style="color: #6b7280;">${subject}</span></p>
                        
                        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                            <p style="margin: 10px 0;"><strong style="color: #374151;">Message:</strong></p>
                            <div style="background-color: #f3f4f6; padding: 15px; border-radius: 6px; margin-top: 10px;">
                                <p style="color: #4b5563; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div style="margin-top: 20px; padding: 15px; background-color: #eff6ff; border-left: 4px solid #3b82f6; border-radius: 4px;">
                        <p style="margin: 0; color: #1e40af; font-size: 14px;">💡 You can reply directly to <strong>${email}</strong></p>
                    </div>
                    
                    <p style="text-align: center; color: #9ca3af; font-size: 12px; margin-top: 30px;">Sent from your portfolio website</p>
                </div>
            `
        };

        transporter.sendMail(mailOptions, (emailErr, info) => {
            if (emailErr) {
                console.error('Error sending email:', emailErr);
                // Still return success to user even if email fails
            } else {
                console.log('Email sent successfully:', info.response);
            }
        });

        res.json({
            success: true,
            message: 'Thank you! Your message has been received.',
            id: this.lastID
        });
    });
});

// Get all contacts (for admin view)
app.get('/api/contacts', (req, res) => {
    const sql = `SELECT * FROM contacts ORDER BY created_at DESC`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error('Error fetching contacts:', err.message);
            return res.status(500).json({
                success: false,
                message: 'Error fetching contacts'
            });
        }

        res.json({
            success: true,
            contacts: rows
        });
    });
});

// Get single contact by ID
app.get('/api/contacts/:id', (req, res) => {
    const sql = `SELECT * FROM contacts WHERE id = ?`;

    db.get(sql, [req.params.id], (err, row) => {
        if (err) {
            console.error('Error fetching contact:', err.message);
            return res.status(500).json({
                success: false,
                message: 'Error fetching contact'
            });
        }

        if (!row) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }

        res.json({
            success: true,
            contact: row
        });
    });
});

// Delete contact
app.delete('/api/contacts/:id', (req, res) => {
    const sql = `DELETE FROM contacts WHERE id = ?`;

    db.run(sql, [req.params.id], function (err) {
        if (err) {
            console.error('Error deleting contact:', err.message);
            return res.status(500).json({
                success: false,
                message: 'Error deleting contact'
            });
        }

        if (this.changes === 0) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }

        res.json({
            success: true,
            message: 'Contact deleted successfully'
        });
    });
});

// Track visitor
app.post('/api/track-visit', (req, res) => {
    const ip = req.ip || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];
    const page = req.body.page || '/';

    const sql = `INSERT INTO visitors (ip_address, user_agent, page_visited) VALUES (?, ?, ?)`;

    db.run(sql, [ip, userAgent, page], function (err) {
        if (err) {
            console.error('Error tracking visit:', err.message);
        }
        res.json({ success: true });
    });
});

// Get visitor statistics
app.get('/api/stats', (req, res) => {
    const queries = {
        totalVisits: `SELECT COUNT(*) as count FROM visitors`,
        uniqueVisitors: `SELECT COUNT(DISTINCT ip_address) as count FROM visitors`,
        totalContacts: `SELECT COUNT(*) as count FROM contacts`,
        recentVisits: `SELECT * FROM visitors ORDER BY visited_at DESC LIMIT 10`
    };

    const stats = {};

    db.get(queries.totalVisits, [], (err, row) => {
        if (err) {
            console.error('Error getting total visits:', err.message);
            return res.status(500).json({ success: false });
        }
        stats.totalVisits = row.count;

        db.get(queries.uniqueVisitors, [], (err, row) => {
            if (err) {
                console.error('Error getting unique visitors:', err.message);
                return res.status(500).json({ success: false });
            }
            stats.uniqueVisitors = row.count;

            db.get(queries.totalContacts, [], (err, row) => {
                if (err) {
                    console.error('Error getting total contacts:', err.message);
                    return res.status(500).json({ success: false });
                }
                stats.totalContacts = row.count;

                db.all(queries.recentVisits, [], (err, rows) => {
                    if (err) {
                        console.error('Error getting recent visits:', err.message);
                        return res.status(500).json({ success: false });
                    }
                    stats.recentVisits = rows;

                    res.json({
                        success: true,
                        stats
                    });
                });
            });
        });
    });
});

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`API endpoints available at http://localhost:${PORT}/api`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err.message);
        } else {
            console.log('Database connection closed');
        }
        process.exit(0);
    });
});
