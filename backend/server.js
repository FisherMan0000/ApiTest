// server.js
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const authController = require('./controllers/authController');
const roleController = require('./controllers/roleController');
const { checkRole } = require('./middlewares/authMiddleware');
const apiRoutes = require('./routes/api');

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

// Initialize session
app.use(session({
    secret: 'sadao', // Use a strong secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Auth routes
app.post('/login', authController.login);
app.post('/logout', authController.logout);

// Role-based routes
app.put('/api/petrol/:id', checkRole('Manager'), roleController.updatePetrolPrice);

// Use API routes
app.use('/api', apiRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
