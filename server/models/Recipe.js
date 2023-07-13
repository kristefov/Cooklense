const { Schema } = require('mongoose');

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
