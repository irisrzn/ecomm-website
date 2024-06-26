const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Register a new user
const register = async (req, res, next) => {
    const { username, email, password, fname, lname } = req.body;

    try {
        const user = new User({ username, email, password, fname, lname });
        await user.save();

        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
            expiresIn: '1 hour'
        });

        res.json({ message: 'Registration successful', token });
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

// const login = async (req, res, next) => {
//     const { username, password } = req.body;

//     try {
//         const user = await User.findOne({ username });
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         const passwordMatch = await bcrypt.compare(password, user.password);
//         if (!passwordMatch) {
//             return res.status(401).json({ message: 'Incorrect password' });
//         }

//         const { accessToken, refreshToken } = generateTokens(user);

//         res.json({ accessToken, refreshToken });
//     } catch (error) {
//         next(error);
//     }
// };

// const generateTokens = (user) => {
//     const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20m' });
//     const refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET);
//     return { accessToken, refreshToken };
// };

// const refreshToken = async (req, res, next) => {
//     const refreshToken = req.body.refreshToken;

//     if (!refreshToken) {
//         return res.status(401).json({ message: 'Refresh token is required' });
//     }

//     try {
//         const decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
//         const user = await User.findById(decodedToken.userId);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20m' });

//         res.json({ accessToken });
//     } catch (error) {
//         next(error);
//     }
// };

module.exports = { register, login };