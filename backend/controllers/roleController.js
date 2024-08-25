// controllers/roleController.js
const sql = require('mssql');
const dbconfig = require('../dbconfig'); // Import dbconfig

async function updatePetrolPrice(req, res) {
    const { id } = req.params;
    const { price } = req.body;

    try {
        const pool = await sql.connect(dbconfig);
        await pool.request()
            .input('id', sql.Int, id)
            .input('price', sql.Decimal, price)
            .query('UPDATE dbo.Petrol SET Price = @price WHERE PetrolID = @id');

        res.status(200).json({ message: 'Price updated successfully' });
    } catch (error) {
        console.error('Error updating petrol price:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = { updatePetrolPrice };
