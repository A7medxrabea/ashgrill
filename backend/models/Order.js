const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  quantity: { type: Number, default: 1 },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);
