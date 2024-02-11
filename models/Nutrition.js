const mongoose = require('mongoose');

const nutritionSchema = new mongoose.Schema({
    mealsCount: {
        type: Number,
        required: true,
    },
    waterCount: {
        type: Number,
        required: true,
    },
    // Add any other fields you want to save
});

const Nutrition = mongoose.model('Nutrition', nutritionSchema);

