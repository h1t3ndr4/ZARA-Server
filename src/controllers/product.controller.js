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

    if(req.query.price){
      const result1 = products.filter((product) => {
        return product.price <= req.query.price;
        
      });
      return res.send(result1);
    }

    if(req.query.price1){
      const result2 = products.filter((product) => {
        return product.price >= req.query.price1;
        
      });
      return res.send(result2);
    }

    return res.send(products);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.get("/:highToLow", async (req, res) => {
  try {
    const products = await Product.find().lean().exec();

    const highToLow = products.sort(function(a,b){
      return b.price - a.price
    })
    return res.send(highToLow);

  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.get("/:lowToHigh", async (req, res) => {
  try {
    const products = await Product.find().lean().exec();

    const lowToHigh = products.sort(function(a,b){
      return a.price - b.price
    })
    return res.send(lowToHigh);

  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = router;
