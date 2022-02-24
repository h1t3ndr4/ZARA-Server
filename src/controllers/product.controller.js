const express = require("express");

const Product = require("../models/product.model");




const router = express.Router();

router.get("", async (req, res) => {
  try {
    const products = await Product.find().lean().exec();

    if (req.query.section) {
      const result = products.filter((product) => {
        return product.section === req.query.section;
        
      });

      console.log("products", result);
      return res.send(result);
    }

    return res.send(products);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = router;
