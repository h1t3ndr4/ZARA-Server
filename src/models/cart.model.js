const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    products : [{type: mongoose.Schema.Types.ObjectId, ref: "Products", required: true}],
    userId : {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
})

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;