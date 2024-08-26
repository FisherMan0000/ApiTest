// routes/petrolRoutes.js
const express = require('express');
const { getPetrolData } = require('../controllers/petrolController'); // Import the controller

const router = express.Router();

// Define the route for fetching petrol data
router.get('/petrol', getPetrolData);

module.exports = router;
