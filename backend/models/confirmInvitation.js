const mongoose = require("mongoose");

const confirmInvitationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please tell us your name!"],
    },
    phone: {
      type: String,
      required: true,
    },
    group: {
      type: String,
      // enum: ["Nhà gái", "Nhà trai", "None"],
      required: true,
    },
    numberOfPeople: {
      type: Number,
      required: true,
      min: 0,
    },
    attendingDinner: {
      type: [{ type: Object, required: true }],
      required: true,
    },

    attending: {
      type: String,
      required: true,
    },
    departure_time: {
      type: String,
    },
    returning_time: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const confirmInvitation = mongoose.model(
  "confirmInvitation",
  confirmInvitationSchema
);

module.exports = confirmInvitation;
