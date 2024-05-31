const Order = require('../models/Order'); // Adjust the path as needed
const Address = require('../models/Address'); // Adjust the path as needed
const Cart = require('../models/Cart'); // Adjust the path as needed

// Create Order
exports.createOrder = async (req, res) => {
    try {
        const { country, street1, street2, city, state, zip } = req.body;

        // Fetch the user's cart
        const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
        if (!cart || cart.items.length === 0) {
            return res.status(400).send({ error: 'Cart is empty' });
        }

        // Calculate total price
        let total = 0;
        for (const item of cart.items) {
            total += item.product.price * item.quantity;
        }

        // Check if the address already exists
        let address = await Address.findOne({
            user: req.user._id,
            country: country.trim(),
            street1: street1.trim(),
            street2: street2 ? street2.trim() : '',
            city: city.trim(),
            state: state.trim(),
            zip: zip.trim()
        });

        // If the address does not exist, create a new one
        if (!address) {
            address = new Address({
                user: req.user._id,
                country: country.trim(),
                street1: street1.trim(),
                street2: street2 ? street2.trim() : '',
                city: city.trim(),
                state: state.trim(),
                zip: zip.trim()
            });
            await address.save();
        }

        // Create new order
        const order = new Order({
            user: req.user._id,
            items: cart.items.map(item => ({
                product: item.product._id,
                quantity: item.quantity
            })),
            total,
            address: address._id
        });
        await order.save();

        // Clear the user's cart
        cart.items = [];
        await cart.save();

        res.status(201).send({ message: 'Order created successfully', order });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};


// Get single order
exports.getOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('address').populate('user', 'username email');
        if (!order) {
            return res.status(404).send({ error: 'Order not found' });
        }
        res.status(200).send(order);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

// Get all orders
// exports.getAllOrders = async (req, res) => {
//     try {
//         const orders = await Order.find().populate('address').populate('user', 'username email');
//         res.status(200).send(orders);
//     } catch (error) {
//         res.status(400).send({ error: error.message });
//     }
// };
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).populate('address').populate('user', 'username email');
        res.status(200).send(orders);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};