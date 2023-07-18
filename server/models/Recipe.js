const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedrecipes` array in User.js
const recipeSchema = new Schema({
    
    idMeal: {
        type: String,
        required: true,
    },
    strMeal: {
        type: String,
        required: true,
    },
    strMealThumb: {
        type: String,
    },
   

});

module.exports = recipeSchema;
