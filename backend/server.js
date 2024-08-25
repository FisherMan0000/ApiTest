// server.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sql = require('mssql');
const cors = require('cors');
const app = express();
const routes = require('./routes'); // Import the routes defined in routes.js
const dboperation = require('./dboperation');
const config = require('./database'); // Import your SQL Server configuration




// Middleware
app.use(express.json());
app.use(cors());
sql.connect(config); // Establish the database connection

// Use the imported routes
app.use(routes);

// Login route (you can keep it here or move it to routes.js for better separation)
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log('Login request received:', username);

    try {
        const pool = await sql.connect(config);
        console.log('Connected to the database');

        const result = await pool.request()
            .input('username', sql.VarChar, username)
            .query('SELECT * FROM Users WHERE username = @username');
        
        console.log('SQL Query executed. Result:', result.recordset);

        if (result.recordset.length > 0) {
            const user = result.recordset[0];
            console.log('User found:', user);

            const isMatch = await (password, user.password); //const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                console.log('Password matched');

                const token = jwt.sign({ id: user.id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });
                res.json({ token, role: user.role });
            } else {
                console.log('Password mismatch');
                res.status(400).json({ message: 'Invalid credentials' });
            }
        } else {
            console.log('User not found in the database');
            res.status(400).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error during login process:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Start the server
app.listen(3001, () => {
    console.log('Server is running on port 3001');
});

module.exports = config; // Export the config if you want to use it in other files
