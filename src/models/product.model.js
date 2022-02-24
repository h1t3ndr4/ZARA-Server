const mongoose = require("mongoose");


const productsSchema = new mongoose.Schema({});

const Product = mongoose.model("Products", productsSchema, "Products");

module.exports = Product;