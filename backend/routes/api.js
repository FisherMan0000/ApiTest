// routes/api.js
const express = require('express');
const sql = require("mssql");
const config = require('../dbconfig');
const router = express.Router();

// Function to fetch petrol data
async function getPetrolData() {
    try {
        const response = await axios.get('http://localhost:3001/Petrol');
        let pool = await sql.connect(config);
        let result = await pool.request().query("SELECT * FROM dbo.Petrol");
        return result.recordset;
    } catch (err) {
        console.error('Error fetching petrol data:', err);
        throw err; // Re-throw the error after logging it
    }
}

// Define a GET endpoint to fetch petrol data
router.get('/petrol', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:3001/Petrol');
        const petrolData = await getPetrolData();
        res.status(200).json(petrolData); // Send the petrol data as a JSON response
    } catch (err) {
        res.status(500).send('Error fetching petrol data');
    }
});


// Export the router
module.exports = router;
