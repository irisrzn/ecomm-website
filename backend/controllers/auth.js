const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const refreshToken = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(400).send({ error: 'Refresh token is required' });
    }

    try {
        const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(payload.id);

        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });

        res.send({ accessToken });
    } catch (error) {
        res.status(401).send({ error: 'Invalid refresh token' });
    }
};

// Register a new user
const register = async (req, res, next) => {
    const { username, email, password, fname, lname } = req.body;

    try {
        const user = new User({ username, email, password, fname, lname });
        await user.save();
        res.json({ message: 'Registration successful' });
    } catch (error) {
        next(error);
    }
};

// Login with an existing user
const login = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const passwordMatch = await user.comparePassword(password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
            expiresIn: '1 hour'
        });

        const role = user.role;
        res.json({ token, role });
    } catch (error) {
        next(error);
    }
};

module.exports = { register, login, refreshToken };