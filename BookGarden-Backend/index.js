const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();
const path = require("path");
const DB_MONGO = require("./app/config/db.config");
const _CONST = require("./app/config/constant");
// const { sendEmailNotification } = require('./app/kafka/consumer');

//router
const authRoute = require("./app/routers/auth");
const userRoute = require("./app/routers/user");
const productRoute = require("./app/routers/product");
const categoryRoute = require("./app/routers/category");
const authorRoute = require("./app/routers/author");
const pulisherRoute = require("./app/routers/pulisher");
const uploadFileRoute = require("./app/routers/uploadFile");
const newsRoute = require("./app/routers/news");
const orderRoute = require("./app/routers/order");
const statisticalRoute = require("./app/routers/statistical");
const paymentRoute = require("./app/routers/paypal");
const contactRoute = require("./app/routers/contact");
const complaintModel = require("./app/models/complaintModel");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));

mongoose
  .connect(DB_MONGO.URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB.");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/category", categoryRoute);
app.use("/api/author", authorRoute);
app.use("/api/pulisher", pulisherRoute);
app.use("/api/uploadFile", uploadFileRoute);
app.use("/api/news", newsRoute);
app.use("/api/statistical", statisticalRoute);
app.use("/api/order", orderRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/contacts", contactRoute);
app.use("/uploads", express.static("uploads"));
// sendEmailNotification();
app.get('/api/complaint/:id', async (req, res) => {
  try {
    const complaint = await complaintModel.findOne({ orderId: req.params.orderId });
    if (!complaint) {
      return res.status(404).json({ message: 'Không tìm thấy khiếu nại với đơn hàng này' });
    }
    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy dữ liệu khiếu nại' });
  }
});
app.post('/api/create-complaint', async (req, res) => {
  try {
    const complaint = await complaintModel.create(req.body);
   return res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
const PORT = process.env.PORT || _CONST.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
