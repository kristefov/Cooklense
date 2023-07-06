const { Schema } = require('mongoose');

const recipeSchema = new Schema({
    uri: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },

});

module.exports = recipeSchema;
