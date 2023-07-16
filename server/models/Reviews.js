const { Schema, model} = require('mongoose');

const reviewSchema = new Schema({
    idMeal: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        ref: 'User',
    },
    rate: {
        type: Number,
        required: true,
    },
    review: {
        type: String,
        required: true,
    }
})

const Reviews = model("Reviews", reviewSchema);

module.exports = Reviews;