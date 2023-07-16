const { Schema, model } = require("mongoose");

const reviewSchema = new Schema({
  idMeal: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    ref: "User",
  },
  rating: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});

const Reviews = model("Reviews", reviewSchema);

module.exports = Reviews;
