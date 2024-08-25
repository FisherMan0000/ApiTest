const sql = require('mssql');
const bcrypt = require('bcryptjs');
const dbconfig = require('../dbconfig');

sql.connect(dbconfig);

// Login function
async function login(req, res) {
    const { username, password } = req.body;

    try {
        const pool = await sql.connect(dbconfig);
        const result = await pool.request()
            .input('username', sql.VarChar, username)
            .query('SELECT * FROM Users WHERE username = @username');

        if (result.recordset.length > 0) {
            const user = result.recordset[0];

            const isMatch = await bcrypt.compare(password, user.password);

            if (isMatch) {
                // Set session variables
                req.session.userId = user.id;
                req.session.role = user.role;

                res.json({ message: 'Login successful', role: user.role });
            } else {
                res.status(400).json({ message: 'Invalid credentials' });
            }
        } else {
            res.status(400).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error during login process:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Logout function
function logout(req, res) {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to logout' });
        }
        res.clearCookie('connect.sid');
        res.json({ message: 'Logout successful' });
    });
}

module.exports = { login, logout };
