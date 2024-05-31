const express = require('express');
const router = express.Router();
const Address = require('../models/Address');
const isAuthenticated = require('../middlewares/auth').isAuthenticated;
const authenticate = require('../middlewares/auth').authenticate;

// Create a new address for a user
router.post('/', isAuthenticated, async (req, res) => {
    try {
        const { country, street1, street2, city, state, zip } = req.body;
        const address = new Address({
            user: req.user._id, // Ensure this is set correctly
            country,
            street1,
            street2,
            city,
            state,
            zip
        });
        await address.save();
        res.status(201).send({ message: 'Address created successfully', address });
    } catch (error) {
        res.status(400).send({ error: 'Error creating address', details: error.message });
    }
});

// Get user's address
router.get('/:userId', isAuthenticated, async (req, res) => {
    try {
        const address = await Address.findOne({ user: req.params.userId });
        if (!address) {
            return res.status(404).send({ error: 'Address not found' });
        }
        res.send(address);
    } catch (error) {
        res.status(500).send({ error: 'Error fetching address', details: error.message });
    }
});

// Update user's address
router.put('/:userId', isAuthenticated, async (req, res) => {
    try {
        const address = await Address.findOneAndUpdate(
            { user: req.params.userId },
            req.body,
            { new: true, upsert: true }
        );
        res.send(address);
    } catch (error) {
        res.status(500).send({ error: 'Error updating address', details: error.message });
    }
});

module.exports = router;
