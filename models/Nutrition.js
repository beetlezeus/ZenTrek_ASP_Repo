
const mongoose = require('mongoose');

const nutritionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    waterIntake: {
        type: Number,
        required: true,
    },
    waterNotes: {
        type: String,
        trim: true,
    },
        breakfast: {
        meal: {
            type: Boolean,
            default: false,
        },
        snack: {
            type: Boolean,
            default: false,
        },
        description: String,
    },
    lunch: {
        meal: {
            type: Boolean,
            default: false,
        },
        snack: {
            type: Boolean,
            default: false,
        },
        description: String,
    },
    dinner: {
        meal: {
            type: Boolean,
            default: false,
        },
        snack: {
            type: Boolean,
            default: false,
        },
        description: String,
    },
    snacks: {
        healthy: {
            type: Boolean,
            default: false,
        },
        unhealthy: {
            type: Boolean,
            default: false,
        },
        description: String,
    },
    date: {
    type: Date,
    default: Date.now
    }
});

const Nutrition = mongoose.model('Nutrition', nutritionSchema);

module.exports = Nutrition;
