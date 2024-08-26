// const express = require('express');
// const session = require('express-session');
// const cors = require('cors');
// const sql = require('mssql'); // Make sure to import the SQL module
// const authController = require('./controllers/authController');
// const roleController = require('./controllers/roleController');
// const { checkRole } = require('./middlewares/authMiddleware');
// const apiRoutes = require('./routes/api');
// const config = require('./dbconfig'); // Ensure this exports a function to connect to the database

// const app = express();
// const port = 3001;

// // Connect to the database
// config().catch(err => {
//     console.error('Failed to connect to the database:', err);
//     process.exit(1); // Exit the process if the database connection fails
// });

// // Apply CORS middleware before defining routes
// app.use(cors());

// // Initialize session
// app.use(session({
//     secret: 'sadao', // Use a strong secret key
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false } // Set to true if using HTTPS
// }));

// app.use(express.json());

// // Endpoint to fetch data from the database
// app.get('/petrol', async (req, res) => {
//     try {
//         // Ensure the database connection is established
//         const pool = await sql.connect(config);
//         const result = await pool.request().query('SELECT * FROM Petrol');
//         res.json(result.recordset); // Send the fetched data as JSON
//     } catch (err) {
//         console.error('Database query failed:', err);
//         res.status(500).send('Internal Server Error');
//     }
// });

// // Auth routes
// app.post('/login', authController.login);
// app.post('/logout', authController.logout);

// // Role-based routes
// app.put('/api/petrol/:id', checkRole('Manager'), roleController.updatePetrolPrice);

// // Use API routes
// app.use('/api', apiRoutes);

// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });


// server.js
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const sql = require('mssql');
const config = require('./dbconfig'); // Ensure this exports the correct config

const app = express();
const port = 3001;

// Connect to the database
sql.connect(config).catch(err => {
    console.error('Failed to connect to the database:', err);
    process.exit(1); // Exit the process if the database connection fails
});

// Apply CORS middleware before defining routes
app.use(cors());

// Initialize session
app.use(session({
    secret: 'sadao',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

app.use(express.json());

// Endpoint to fetch data from the database
app.get('/petrol', async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request().query('SELECT * FROM Petrol');
        res.json(result.recordset); // Send the fetched data as JSON
    } catch (err) {
        console.error('Database query failed:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Define other routes (auth, role-based, etc.)
app.post('/login', (req, res) => { /* your login logic */ });
app.post('/logout', (req, res) => { /* your logout logic */ });
app.put('/api/petrol/:id', (req, res) => { /* your update logic */ });

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
