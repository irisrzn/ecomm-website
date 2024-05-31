const Cart = require('../models/Cart');

exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
        if (!cart) {
            return res.status(404).send({ error: 'Cart not found' });
        }
        res.send(cart);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.addToCart = async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        let cart = await Cart.findOne({ user: req.user._id });

        if (cart) {
            // Cart exists, update it
            const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity = Number(cart.items[itemIndex].quantity) + Number(quantity);
            } else {
                cart.items.push({ product: productId, quantity: Number(quantity) });
            }
        } else {
            // No cart, create a new one
            cart = new Cart({
                user: req.user._id,
                items: [{ product: productId, quantity: Number(quantity) }]
            });
        }

        await cart.save();
        res.send(cart);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.removeFromCart = async (req, res) => {
    const { productId } = req.body;

    try {
        const cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            return res.status(404).send({ error: 'Cart not found' });
        }

        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
        if (itemIndex > -1) {
            const item = cart.items[itemIndex];
            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                cart.items.splice(itemIndex, 1);
            }
            await cart.save();
            res.send(cart);
        } else {
            res.status(404).send({ error: 'Item not found in cart' });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

