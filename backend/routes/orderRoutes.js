const express = require("express");
const router = express.Router();
const Order = require("../models/Order"); // ✅ correct

// POST new order
router.post("/", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.json({ message: "✅ Order saved successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
