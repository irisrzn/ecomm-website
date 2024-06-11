const Order = require('../models/Order');
const Address = require('../models/Address');
const Cart = require('../models/Cart');
const Payment = require('../models/Payment');

exports.createOrder = async (req, res) => {         
    try {

        if (!req.body.address || !req.body.payment) {
            return res.status(400).send({ error: 'Address or payment details are missing in the request body' });
        }
        
        const { country, street1, street2, city, state, zip } = req.body.address;
        const { cardNumber, expirationMonth, expirationYear, cvv } = req.body.payment;

        const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
        if (!cart || cart.items.length === 0) {
            return res.status(400).send({ error: 'Cart is empty' });
        }

        let total = 0;
        for (const item of cart.items) {
            total += item.product.price * item.quantity;
        }

        let address = await Address.findOne({
            user: req.user._id,
            country: country?.trim(),
            street1: street1?.trim(),
            street2: street2 ? street2.trim() : '',
            city: city?.trim(),
            state: state?.trim(),
            zip: zip?.trim()
        });

        if (!address) {
            address = new Address({
                user: req.user._id,
                country: country?.trim(),
                street1: street1?.trim(),
                street2: street2 ? street2.trim() : '',
                city: city?.trim(),
                state: state?.trim(),
                zip: zip?.trim()
            });
            await address.save();
        }

        const payment = new Payment({
            user: req.user._id,
            status: 'pending',
            amount: total,
            card: {
                cardNumber: cardNumber?.trim(),
                expirationMonth: expirationMonth,
                expirationYear: expirationYear,
                cvv: cvv.trim()
            }
        });
        await payment.save();

        const order = new Order({
            user: req.user._id,
            items: cart.items.map(item => ({
                product: item.product._id,
                quantity: item.quantity
            })),
            total,
            address: address._id,
            payment: payment._id
        });
        await order.save();

        cart.items = [];
        await cart.save();

        res.status(201).send({ message: 'Order created successfully', order });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

exports.getOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('address').populate('user', 'username email').populate('payment').populate('items.product')  ;

        if (!order) {
            return res.status(404).send({ error: 'Order not found' });
        }
        res.status(200).send(order);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).populate('address').populate('user', 'username email').populate('payment').populate('items.product');
        res.status(200).send(orders);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};
