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
    // we need to find what id will be returned form the fetch from the api this might change
    recipeId: {
        type: String,
        required: true,
    }

});

module.exports = recipeSchema;
