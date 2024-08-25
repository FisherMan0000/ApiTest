const config = require('./server'); // Changed var to const for consistency
const sql = require("mssql");

async function getPetrolData() {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request().query("SELECT * FROM dbo.Petrol");
        return result.recordset; // Return the result set directly
    } catch (err) {
        console.error('Error fetching petrol data:', err);
        throw err; // Re-throw the error after logging it
    }
}
module.exports = {
    getPetrolData // Object shorthand notation for exporting the function
};
