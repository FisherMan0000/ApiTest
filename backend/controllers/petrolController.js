const sql = require('mssql');
const dbconfig = require('./dbconfig');

const getPetrolData = async (req, res) => {
    try {
      const request = new sql.Request();
      
      // SQL query to fetch data from the Petrol table
      const result = await request.query('SELECT * FROM Petrol');
      
      res.json(result.recordset); // Send the fetched data as JSON
    } catch (err) {
      console.error('Database query failed:', err);
      res.status(500).send('Internal Server Error');
    }
  };
  
  module.exports = { getPetrolData };
