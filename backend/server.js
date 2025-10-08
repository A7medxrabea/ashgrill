const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const Order = require("./models/Order"); // ✅ add this line for admin route

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Routes
const orderRoutes = require("./routes/orderRoutes");
app.use("/api/orders", orderRoutes);

// ✅ MongoDB connection
console.log("MONGO_URI from .env:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));


// ✅ ADMIN: View all orders
app.get("/api/admin/orders", async (req, res) => {
  const key = req.query.key; // admin key in URL
  if (key !== process.env.ADMIN_KEY) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const orders = await Order.find().sort({ date: -1 });
    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ message: err.message });
  }
});


// ✅ Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
