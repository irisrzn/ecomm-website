const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://irisrzn:Olivia.2002@myfirstcluster.j36txik.mongodb.net/ecomm?retryWrites=true&w=majority');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Error connecting to MongoDB:', error);
    }
};

module.exports = connectDB;
