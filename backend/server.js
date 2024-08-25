const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sql = require('mssql');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const config = {
    user: 'sa',
    password: '1234',
    server: '127.0.0.1', 
    database: 'book',
    options: {
        encrypt: false,
        trustServerCertificate: true,
        enableArithAbort: true
    }
};

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log('Login request received:', username); // Debug log

    try {
        const pool = await sql.connect(config);
        console.log('Connected to the database'); // Debug log

        const result = await pool.request()
            .input('username', sql.VarChar, username)
            .query('SELECT * FROM Users WHERE username = @username');
        
        console.log('SQL Query executed. Result:', result.recordset); // Debug log

        if (result.recordset.length > 0) {
            const user = result.recordset[0];
            console.log('User found:', user); // Debug log

            const isMatch = await (password, user.password);

            if (isMatch) {
                console.log('Password matched'); // Debug log

                const token = jwt.sign({ id: user.id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });
                res.json({ token, role: user.role });
            } else {
                console.log('Password mismatch'); // Debug log

                res.status(400).json({ message: 'Invalid credentials' });
            }
        } else {
            console.log('User not found in the database'); // Debug log
            res.status(400).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error during login process:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
