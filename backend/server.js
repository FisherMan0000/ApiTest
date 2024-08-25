// // server.js
// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const sql = require('mssql');
// const cors = require('cors');
// const app = express();
// const routes = require('./routes'); // Import the routes defined in routes.js
// const dboperation = require('./dboperation');
// const database = require('./database');
// const dbconfig = require('./dbconfig'); // Import your SQL Server configuration



// // Middleware
// app.use(express.json());
// app.use(cors());
// sql.connect(dbconfig); // Establish the database connection

// // Use the imported routes
// app.use(routes);

// // Login route (you can keep it here or move it to routes.js for better separation)
// app.post('/login', async (req, res) => {
//     const { username, password } = req.body;
//     console.log('Login request received:', username);

//     try {
//         const pool = await sql.connect(dbconfig);
//         console.log('Connected to the database');

//         const result = await pool.request()
//             .input('username', sql.VarChar, username)
//             .query('SELECT * FROM Users WHERE username = @username');

//         console.log('SQL Query executed. Result:', result.recordset);

//         if (result.recordset.length > 0) {
//             const user = result.recordset[0];
//             console.log('User found:', user);

//             // const password = '$2a$10$RsPkZbn7A104CSkMZ.MrceFcko7qA0vi4bLmB1CZp570gTcGZT4a6';
//             // const password = '123456789'; 

//             const isMatch = await bcrypt.compare(password, user.password); //const isMatch = await bcrypt.compare(password, user.password);
//             if (isMatch) {
//                 console.log('Password matched');
//                 const token = jwt.sign({ id: user.id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });
//                 res.json({ token, role: user.role });
//             } else {
//                 console.log('Password mismatch');
//                 res.status(400).json({ message: 'Invalid credentials' });
//             }
//         } else {
//             console.log('User not found in the database');
//             res.status(400).json({ message: 'User not found' });
//         }
//     } catch (error) {
//         console.error('Error during login process:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// // Start the server
// app.listen(3001, () => {
//     console.log('Server is running on port 3001');
// });

// server.js
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const authController = require('./controllers/authController');
const roleController = require('./controllers/roleController');
const { checkRole } = require('./middlewares/authMiddleware');

const app = express();
app.use(express.json());
app.use(cors());

// Initialize session
app.use(session({
    secret: 'your_secret_key', // Use a strong secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Auth routes
app.post('/login', authController.login);
app.post('/logout', authController.logout);

// Role-based routes
app.put('/api/petrol/:id', checkRole('Manager'), roleController.updatePetrolPrice);

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});




