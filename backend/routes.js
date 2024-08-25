// routes.js
const express = require('express');
const router = express.Router();
const { getPetrolData, getUsersData} = require('./database'); // Import functions from database.js

// Define the route to get petrol data
router.get('/api/petrol', async (req, res) => {
    try {
        const petrolData = await getPetrolData();
        res.status(200).json(petrolData);
    } catch (err) {
        res.status(500).send('Error fetching petrol data');
    }
});



// Define another route to get users data
router.get('/api/users', async (req, res) => {
    try {
        const usersData = await getUsersData();
        res.status(200).json(usersData);
    } catch (err) {
        res.status(500).send('Error fetching users data');
    }
});

//testing. noting much!!
router.get('/api/test', async (req, res) => {
    try {
        const petrolData = await gettest();
        res.status(200).json(petrolData);
    } catch (err) {
        res.status(500).send('Error fetching test data');
    }
});

// Export the router to be used in server.js
module.exports = router;
