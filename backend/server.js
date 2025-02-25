require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//import models
const confirmInvitation = require("./models/confirmInvitation");

const app = express();
app.use(express.json());
const corsOptions = {
  origin: process.env.ORIGIN_CLIENT || "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE,PATCH",
};

app.use(cors(corsOptions));

// Kết nối MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

app.get("/", (req, res) => {
  res.send("Hello, welcome to my wedding app!");
});

app.get("/api/message", (req, res) => {
  res.json({ message: "Welcome to my wedding app!" });
});

// Route to handle form submission
app.post("/api/confirmInvitation", async (req, res) => {
  const {
    name,
    id,
    phone,
    group,
    numberOfPeople,
    attendingDinner,
    attending,
    departure_time,
    returning_time,
    message,
  } = req.body;

  try {
    // Check if an invitation with the same name already exists
    const existingRSVP = await confirmInvitation.findOne({ name });

    if (existingRSVP) {
      // If the RSVP exists, update it with new data
      existingRSVP.phone = phone;
      existingRSVP.group = group;
      existingRSVP.numberOfPeople = numberOfPeople;
      existingRSVP.attendingDinner = attendingDinner;
      existingRSVP.attending = attending;
      existingRSVP.departure_time = departure_time;
      existingRSVP.returning_time = returning_time;
      existingRSVP.message = message;

      await existingRSVP.save();
      res.status(200).json({
        message: "updated",
        data: existingRSVP,
      });
    } else {
      // If the RSVP does not exist, create a new one
      const newRSVP = new confirmInvitation({
        name,
        id,
        phone,
        group,
        numberOfPeople,
        attendingDinner,
        attending,
        departure_time,
        returning_time,
        message,
      });

      await newRSVP.save();
      res.status(201).json({
        message: "created",
        data: newRSVP,
      });
    }
  } catch (err) {
    console.error("Lỗi khi lưu dữ liệu:", err);
    res
      .status(500)
      .json({ message: "Đã xảy ra lỗi khi lưu dữ liệu.", error: err });
  }
});
app.get("/api/getInvitation/:name", async (req, res) => {
  const { name } = req.params;

  try {
    const rsvp = await confirmInvitation.findOne({ name });
    console.log("rsvp: ", rsvp);

    if (!rsvp) {
      return res.status(404).json({ message: "Không tìm thấy lời mời." });
    }

    res.status(200).json({ message: "success", data: rsvp });
  } catch (err) {
    console.error("Lỗi khi lấy dữ liệu:", err);
    res
      .status(500)
      .json({ message: "Đã xảy ra lỗi khi lấy dữ liệu.", error: err });
  }
});

// Khởi động server
const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
