const express = require("express");

const Cart = require("../models/cart.model");

const router = express.Router();

router.post("", async (req, res) => {
    try {
        const cart = await Cart.create(req.body);
        res.send(cart);
    } catch (e) {
        res.status(500).send(e.message);
    }
})

router.get("/:id", async (req, res) => {
    try {
        const carts = await Cart.findOne(req.params.id).lean().exec();
        res.send(carts);
    } catch (e) {
        res.status(500).send(e.message);
    }
})

module.exports = router;