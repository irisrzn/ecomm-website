const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const addressRoutes = require('./routes/adresses');
const cartRoutes = require('./routes/cart');
const adminRoutes = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Connect to MongoDB
connectDB();

// Parse JSON request body
app.use(express.json());

// Define routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/api', productRoutes);
app.use('/orders', orderRoutes);
app.use('/address', addressRoutes);
app.use('/cart', cartRoutes);
app.use('/admin', adminRoutes);


// Start the server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});