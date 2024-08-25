const express = require('express');
const sql = require("mssql");
const config = require('./server'); // Your SQL Server configuration
const app = express();
const port = 3001; // You can choose any port you like

// Function to fetch petrol data
async function getPetrolData() {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request().query("SELECT * FROM dbo.Petrol");
        return result.recordset;
    } catch (err) {
        console.error('Error fetching petrol data:', err);
        throw err; // Re-throw the error after logging it
    }
}

// Define a GET endpoint to fetch petrol data
app.get('/api/petrol', async (req, res) => {
    try {
        const petrolData = await getPetrolData();
        res.status(200).json(petrolData); // Send the petrol data as a JSON response
    } catch (err) {
        res.status(500).send('Error fetching petrol data');
    }
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
