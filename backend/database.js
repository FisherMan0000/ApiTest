// database.js
const sql = require('mssql');
const config = require('./server'); // Import your SQL Server configuration

// Function to fetch data from the Petrol table
// async function gettest() {
//     try {
//         let pool = await sql.connect(config);
//         let result = await pool.request().query("SELECT * FROM dbo.test");
//         return result.recordset;
//     } catch (err) {
//         console.error('Error fetching tset data:', err);
//         throw err;
//     }
// }

// Function to fetch the top 1000 petrol records
async function getPetrolData() {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request().query(`
            SELECT TOP (1000) 
                [PetrolID],
                [Price],
                [QuantityAvailable],
                [DateAdded],
                [LastUpdated]
            FROM [book].[dbo].[Petrol]
        `);
        return result.recordset;
    } catch (err) {
        console.error('Error fetching petrol data:', err);
        throw err; // Re-throw the error after logging it
    }
}


// Function to fetch data from another table, e.g., 'Users'
async function getUsersData() {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request().query("SELECT * FROM dbo.Users");
        return result.recordset;
    } catch (err) {
        console.error('Error fetching users data:', err);
        throw err;
    }
}

// Export the functions to be used in other files
module.exports = {
    getPetrolData,
    getUsersData
};
