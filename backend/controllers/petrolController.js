const sql = require('mssql');
const dbconfig = require('./dbconfig');

async function getPetrolData(req, res) {
    try {
        let pool = await sql.connect(dbconfig);
        let result = await pool.request().query("SELECT * FROM dbo.Petrol");
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error('Error fetching petrol data:', err);
        res.status(500).send('Error fetching petrol data');
    }
}

module.exports = { getPetrolData };
